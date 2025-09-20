import { NextRequest, NextResponse } from 'next/server';

interface ErrorReport {
  errorId: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  level: 'critical' | 'page' | 'component';
}

export async function POST(request: NextRequest) {
  try {
    const errorData: ErrorReport = await request.json();

    // Validate error data
    if (!errorData.message || !errorData.timestamp) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz hata verisi' },
        { status: 400 }
      );
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Client Error Report:', errorData);
    }

    // In production, you would typically:
    // 1. Send to error reporting service (Sentry, LogRocket, etc.)
    // 2. Store in database for analysis
    // 3. Send alerts for critical errors

    // Example: Send to external error service
    if (process.env.NODE_ENV === 'production') {
      await sendToErrorService(errorData);
    }

    // Store in database (if you have error logging table)
    await storeErrorLog(errorData);

    return NextResponse.json({
      success: true,
      message: 'Hata raporu alındı',
      errorId: errorData.errorId,
    });

  } catch (error) {
    console.error('Error reporting failed:', error);
    return NextResponse.json(
      { success: false, error: 'Hata raporlama başarısız' },
      { status: 500 }
    );
  }
}

async function sendToErrorService(errorData: ErrorReport) {
  try {
    // Example: Send to Sentry
    // Sentry.captureException(new Error(errorData.message), {
    //   tags: {
    //     level: errorData.level,
    //     errorId: errorData.errorId,
    //   },
    //   extra: {
    //     stack: errorData.stack,
    //     componentStack: errorData.componentStack,
    //     url: errorData.url,
    //     userAgent: errorData.userAgent,
    //   },
    // });

    // Example: Send to custom error service
    const response = await fetch(process.env.ERROR_REPORTING_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...errorData,
        service: 'mysonai-website',
        environment: process.env.NODE_ENV,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error service responded with ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send to error service:', error);
  }
}

async function storeErrorLog(errorData: ErrorReport) {
  try {
    // Example: Store in database using Prisma
    // await prisma.errorLog.create({
    //   data: {
    //     errorId: errorData.errorId,
    //     message: errorData.message,
    //     stack: errorData.stack,
    //     componentStack: errorData.componentStack,
    //     level: errorData.level,
    //     url: errorData.url,
    //     userAgent: errorData.userAgent,
    //     timestamp: new Date(errorData.timestamp),
    //   },
    // });

    // For now, just log to console
    console.log('Error stored:', errorData.errorId);
  } catch (error) {
    console.error('Failed to store error log:', error);
  }
}
