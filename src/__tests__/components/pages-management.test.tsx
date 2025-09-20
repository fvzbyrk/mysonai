import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, createMockPage, createMockApiResponse, mockFetch } from '../utils/test-utils';
import PagesManagement from '@/app/[locale]/admin/pages/page';

// Mock the custom hooks
jest.mock('@/hooks/usePagesManagement', () => ({
  usePagesManagement: jest.fn(),
}));

jest.mock('@/hooks/useErrorHandler', () => ({
  useErrorHandler: jest.fn(),
}));

jest.mock('@/hooks/usePageForm', () => ({
  usePageForm: jest.fn(),
}));

describe('PagesManagement', () => {
  const mockPages = [
    createMockPage({ id: '1', title: 'Page 1', status: 'published' }),
    createMockPage({ id: '2', title: 'Page 2', status: 'draft' }),
    createMockPage({ id: '3', title: 'Page 3', status: 'archived' }),
  ];

  const mockUsePagesManagement = {
    pages: mockPages,
    selectedPage: null,
    isEditing: false,
    isCreating: false,
    isLoading: false,
    filteredPages: mockPages,
    stats: {
      totalPages: 3,
      publishedPages: 1,
      draftPages: 1,
      archivedPages: 1,
      totalViews: 300,
      totalUsers: 0,
      activeUsers: 0,
      todayViews: 0,
      aiGenerations: 0,
    },
    createPage: jest.fn(),
    updatePage: jest.fn(),
    deletePage: jest.fn(),
    startEditing: jest.fn(),
    startCreating: jest.fn(),
    cancelEditing: jest.fn(),
    setSearchTerm: jest.fn(),
    setStatusFilter: jest.fn(),
  };

  const mockUseErrorHandler = {
    handleError: jest.fn(),
    handleAsyncError: jest.fn(),
  };

  const mockUsePageForm = {
    form: {
      register: jest.fn(() => ({})),
      setValue: jest.fn(),
      watch: jest.fn(() => ''),
      formState: {
        dirtyFields: {},
        errors: {},
      },
    },
    handleSubmit: jest.fn(),
    handleTitleChange: jest.fn(),
    handleTitleBlur: jest.fn(),
    handleContentBlur: jest.fn(),
    addTag: jest.fn(),
    removeTag: jest.fn(),
    resetForm: jest.fn(),
    errors: {},
    isSubmitting: false,
    isDirty: false,
    isValid: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the hooks
    const { usePagesManagement } = require('@/hooks/usePagesManagement');
    const { useErrorHandler } = require('@/hooks/useErrorHandler');
    const { usePageForm } = require('@/hooks/usePageForm');
    
    usePagesManagement.mockReturnValue(mockUsePagesManagement);
    useErrorHandler.mockReturnValue(mockUseErrorHandler);
    usePageForm.mockReturnValue(mockUsePageForm);
  });

  it('renders pages management interface', () => {
    render(<PagesManagement />);
    
    expect(screen.getByText('Sayfa Yönetimi')).toBeInTheDocument();
    expect(screen.getByText('Tüm sayfaları yönetin ve düzenleyin')).toBeInTheDocument();
    expect(screen.getByText('Yeni Sayfa')).toBeInTheDocument();
  });

  it('displays page statistics', () => {
    render(<PagesManagement />);
    
    expect(screen.getByText('3')).toBeInTheDocument(); // totalPages
    expect(screen.getByText('1')).toBeInTheDocument(); // publishedPages
    expect(screen.getByText('300')).toBeInTheDocument(); // totalViews
  });

  it('renders page cards', () => {
    render(<PagesManagement />);
    
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('handles search input', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    const searchInput = screen.getByPlaceholderText('Sayfa ara...');
    await user.type(searchInput, 'test search');
    
    expect(mockUsePagesManagement.setSearchTerm).toHaveBeenCalledWith('test search');
  });

  it('handles status filter buttons', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    const publishedButton = screen.getByText('Yayınlandı');
    await user.click(publishedButton);
    
    expect(mockUsePagesManagement.setStatusFilter).toHaveBeenCalledWith('published');
  });

  it('handles edit page button', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    const editButtons = screen.getAllByRole('button', { name: /düzenle/i });
    await user.click(editButtons[0]);
    
    expect(mockUsePagesManagement.startEditing).toHaveBeenCalledWith(mockPages[0]);
  });

  it('handles delete page button', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    
    const deleteButtons = screen.getAllByRole('button', { name: /sil/i });
    await user.click(deleteButtons[0]);
    
    expect(window.confirm).toHaveBeenCalledWith('Bu sayfayı silmek istediğinizden emin misiniz?');
    expect(mockUsePagesManagement.deletePage).toHaveBeenCalledWith('1');
  });

  it('handles create new page button', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    const createButton = screen.getByText('Yeni Sayfa');
    await user.click(createButton);
    
    expect(mockUsePagesManagement.startCreating).toHaveBeenCalled();
    expect(mockUsePageForm.resetForm).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const loadingMock = {
      ...mockUsePagesManagement,
      isLoading: true,
    };
    
    const { usePagesManagement } = require('@/hooks/usePagesManagement');
    usePagesManagement.mockReturnValue(loadingMock);
    
    render(<PagesManagement />);
    
    expect(screen.getByText('Sayfalar yükleniyor...')).toBeInTheDocument();
  });

  it('shows empty state when no pages', () => {
    const emptyMock = {
      ...mockUsePagesManagement,
      pages: [],
      filteredPages: [],
      stats: {
        ...mockUsePagesManagement.stats,
        totalPages: 0,
      },
    };
    
    const { usePagesManagement } = require('@/hooks/usePagesManagement');
    usePagesManagement.mockReturnValue(emptyMock);
    
    render(<PagesManagement />);
    
    expect(screen.getByText('Gösterilecek sayfa bulunamadı.')).toBeInTheDocument();
  });

  it('displays page status badges correctly', () => {
    render(<PagesManagement />);
    
    // Check for status badges
    expect(screen.getByText('published')).toBeInTheDocument();
    expect(screen.getByText('draft')).toBeInTheDocument();
    expect(screen.getByText('archived')).toBeInTheDocument();
  });

  it('displays page metadata', () => {
    render(<PagesManagement />);
    
    // Check for page metadata
    expect(screen.getByText('test-page')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument(); // views
  });

  it('handles external link button', async () => {
    const user = userEvent.setup();
    render(<PagesManagement />);
    
    // Mock window.open
    window.open = jest.fn();
    
    const externalLinkButtons = screen.getAllByRole('button', { name: /external/i });
    await user.click(externalLinkButtons[0]);
    
    expect(window.open).toHaveBeenCalledWith('test-page', '_blank');
  });
});
