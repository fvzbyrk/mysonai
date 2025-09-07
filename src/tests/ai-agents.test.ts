import { getAgentById, getAllAgents, createAgentConversation, generateProductResponse } from '@/lib/ai-agents'

describe('AI Agents', () => {
  describe('getAgentById', () => {
    it('should return agent by id', () => {
      const agent = getAgentById('fevzi')
      expect(agent).toBeDefined()
      expect(agent?.name).toBe('Fevzi')
      expect(agent?.role).toBe('Takım Lideri & Proje Yöneticisi')
    })

    it('should return undefined for non-existent agent', () => {
      const agent = getAgentById('non-existent')
      expect(agent).toBeUndefined()
    })
  })

  describe('getAllAgents', () => {
    it('should return all agents', () => {
      const agents = getAllAgents()
      expect(agents).toBeInstanceOf(Array)
      expect(agents.length).toBeGreaterThan(0)
      expect(agents[0]).toHaveProperty('id')
      expect(agents[0]).toHaveProperty('name')
      expect(agents[0]).toHaveProperty('role')
    })

    it('should have required properties for each agent', () => {
      const agents = getAllAgents()
      agents.forEach(agent => {
        expect(agent).toHaveProperty('id')
        expect(agent).toHaveProperty('name')
        expect(agent).toHaveProperty('role')
        expect(agent).toHaveProperty('description')
        expect(agent).toHaveProperty('icon')
        expect(agent).toHaveProperty('expertise')
        expect(agent).toHaveProperty('personality')
        expect(agent).toHaveProperty('systemPrompt')
        expect(agent).toHaveProperty('capabilities')
      })
    })
  })

  describe('createAgentConversation', () => {
    it('should create conversation with user message', () => {
      const agents = ['fevzi', 'elif']
      const userRequest = 'Test request'
      const conversation = createAgentConversation(agents, userRequest)

      expect(conversation).toBeInstanceOf(Array)
      expect(conversation.length).toBe(3) // user message + 2 agents
      
      const userMessage = conversation[0]
      expect(userMessage.type).toBe('user')
      expect(userMessage.content).toBe(userRequest)
      expect(userMessage.agentId).toBe('user')
    })

    it('should create agent messages for each agent', () => {
      const agents = ['fevzi']
      const userRequest = 'Test request'
      const conversation = createAgentConversation(agents, userRequest)

      const agentMessage = conversation[1]
      expect(agentMessage.type).toBe('agent')
      expect(agentMessage.agentId).toBe('fevzi')
      expect(agentMessage.content).toContain('Fevzi')
    })
  })

  describe('generateProductResponse', () => {
    it('should generate product response with correct structure', () => {
      const productRequest = {
        type: 'website' as const,
        description: 'Test website',
        requirements: ['responsive', 'fast'],
        target: 'small business'
      }
      const agents = ['fevzi', 'elif', 'burak']

      const response = generateProductResponse(productRequest, agents)

      expect(response).toContain('Ürün Oluşturma Planı')
      expect(response).toContain('Test website')
      expect(response).toContain('website')
      expect(response).toContain('small business')
      expect(response).toContain('Fevzi')
      expect(response).toContain('Elif')
      expect(response).toContain('Burak')
    })

    it('should include budget and timeline if provided', () => {
      const productRequest = {
        type: 'app' as const,
        description: 'Test app',
        requirements: ['mobile', 'offline'],
        target: 'consumers',
        budget: '50000 TL',
        timeline: '3 months'
      }
      const agents = ['fevzi']

      const response = generateProductResponse(productRequest, agents)

      expect(response).toContain('50000 TL')
      expect(response).toContain('3 months')
    })
  })

  describe('Agent Properties', () => {
    it('should have valid system prompts', () => {
      const agents = getAllAgents()
      agents.forEach(agent => {
        expect(agent.systemPrompt).toBeTruthy()
        expect(typeof agent.systemPrompt).toBe('string')
        expect(agent.systemPrompt.length).toBeGreaterThan(100)
      })
    })

    it('should have valid expertise arrays', () => {
      const agents = getAllAgents()
      agents.forEach(agent => {
        expect(agent.expertise).toBeInstanceOf(Array)
        expect(agent.expertise.length).toBeGreaterThan(0)
        agent.expertise.forEach(expertise => {
          expect(typeof expertise).toBe('string')
          expect(expertise.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have valid capabilities arrays', () => {
      const agents = getAllAgents()
      agents.forEach(agent => {
        expect(agent.capabilities).toBeInstanceOf(Array)
        expect(agent.capabilities.length).toBeGreaterThan(0)
        agent.capabilities.forEach(capability => {
          expect(typeof capability).toBe('string')
          expect(capability.length).toBeGreaterThan(0)
        })
      })
    })
  })
})
