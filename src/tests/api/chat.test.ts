import { POST } from '@/app/api/chat/route';

// Mock OpenAI
const mockCreate = jest.fn();
jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  })),
}));

// Mock Supabase
const mockFrom = jest.fn();
jest.mock('@/lib/supabase-server', () => ({
  createServerSupabaseClient: () => ({
    from: mockFrom,
  }),
}));

describe('/api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Supabase response
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: '1', plan: 'free' },
            error: null,
          }),
        }),
      }),
      insert: jest.fn().mockResolvedValue({ data: [], error: null }),
    });
  });

  it('should handle valid chat request', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Test AI response',
          },
        },
      ],
    };
    mockCreate.mockResolvedValue(mockResponse);

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        assistantId: 'fevzi',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Test AI response');
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-4',
      messages: expect.arrayContaining([
        expect.objectContaining({
          role: 'user',
          content: 'Hello',
        }),
      ]),
    });
  });

  it('should handle missing message', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        assistantId: 'fevzi',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Message is required');
  });

  it('should handle missing assistant ID', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Assistant ID is required');
  });

  it('should handle OpenAI API error', async () => {
    mockCreate.mockRejectedValue(new Error('OpenAI API error'));

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        assistantId: 'fevzi',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to generate response');
  });

  it('should check usage limits for free users', async () => {
    // Mock free user with usage limit
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: '1', plan: 'free', totalMessages: 100 },
            error: null,
          }),
        }),
      }),
    });

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        assistantId: 'fevzi',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Usage limit exceeded');
  });

  it('should handle invalid assistant ID', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        assistantId: 'invalid-assistant',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid assistant ID');
  });
});
