import { useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  reportToService?: boolean;
}

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const {
    showToast = true,
    logToConsole = true,
    reportToService = true,
  } = options;

  const handleError = useCallback((
    error: Error | string,
    context?: ErrorContext
  ) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorObject = typeof error === 'string' ? new Error(error) : error;

    // Log to console
    if (logToConsole) {
      console.error('Error handled:', {
        message: errorMessage,
        stack: errorObject.stack,
        context,
        timestamp: new Date().toISOString(),
      });
    }

    // Show toast notification
    if (showToast) {
      toast.error(errorMessage);
    }

    // Report to error service
    if (reportToService) {
      reportError(errorObject, context);
    }
  }, [showToast, logToConsole, reportToService]);

  const handleAsyncError = useCallback(async (
    asyncFn: () => Promise<any>,
    context?: ErrorContext
  ) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, context);
      throw error; // Re-throw to allow caller to handle
    }
  }, [handleError]);

  const handleApiError = useCallback((
    error: any,
    context?: ErrorContext
  ) => {
    let errorMessage = 'Bir hata oluştu';
    
    if (error?.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'API_CALL',
      metadata: {
        ...context?.metadata,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        url: error?.config?.url,
      },
    });
  }, [handleError]);

  const handleValidationError = useCallback((
    errors: Record<string, string[]>,
    context?: ErrorContext
  ) => {
    const errorMessages = Object.values(errors).flat();
    const errorMessage = errorMessages.length > 0 
      ? errorMessages[0] 
      : 'Form doğrulama hatası';

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'VALIDATION',
      metadata: {
        ...context?.metadata,
        validationErrors: errors,
      },
    });
  }, [handleError]);

  const handleNetworkError = useCallback((
    error: any,
    context?: ErrorContext
  ) => {
    let errorMessage = 'Ağ bağlantı hatası';
    
    if (error.code === 'NETWORK_ERROR') {
      errorMessage = 'İnternet bağlantınızı kontrol edin';
    } else if (error.code === 'TIMEOUT') {
      errorMessage = 'İstek zaman aşımına uğradı';
    } else if (error.message) {
      errorMessage = error.message;
    }

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'NETWORK',
      metadata: {
        ...context?.metadata,
        code: error.code,
        type: error.type,
      },
    });
  }, [handleError]);

  const handlePermissionError = useCallback((
    requiredPermission: string,
    context?: ErrorContext
  ) => {
    const errorMessage = `Bu işlem için ${requiredPermission} yetkisi gerekli`;

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'PERMISSION',
      metadata: {
        ...context?.metadata,
        requiredPermission,
      },
    });
  }, [handleError]);

  const handleAuthError = useCallback((
    context?: ErrorContext
  ) => {
    const errorMessage = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın';

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'AUTH',
      metadata: {
        ...context?.metadata,
        redirectTo: '/login',
      },
    });

    // Redirect to login after a delay
    setTimeout(() => {
      window.location.href = '/tr/admin/login';
    }, 2000);
  }, [handleError]);

  const handleNotFoundError = useCallback((
    resource: string,
    context?: ErrorContext
  ) => {
    const errorMessage = `${resource} bulunamadı`;

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'NOT_FOUND',
      metadata: {
        ...context?.metadata,
        resource,
      },
    });
  }, [handleError]);

  const handleServerError = useCallback((
    statusCode: number,
    context?: ErrorContext
  ) => {
    let errorMessage = 'Sunucu hatası';
    
    switch (statusCode) {
      case 500:
        errorMessage = 'Sunucu iç hatası';
        break;
      case 502:
        errorMessage = 'Geçersiz ağ geçidi';
        break;
      case 503:
        errorMessage = 'Servis kullanılamıyor';
        break;
      case 504:
        errorMessage = 'Ağ geçidi zaman aşımı';
        break;
    }

    handleError(errorMessage, {
      ...context,
      action: context?.action || 'SERVER_ERROR',
      metadata: {
        ...context?.metadata,
        statusCode,
      },
    });
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
    handleApiError,
    handleValidationError,
    handleNetworkError,
    handlePermissionError,
    handleAuthError,
    handleNotFoundError,
    handleServerError,
  };
}

// Helper function to report errors to external service
async function reportError(error: Error, context?: ErrorContext) {
  try {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: context?.userId,
    };

    // Send to error reporting service
    await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    });
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
}
