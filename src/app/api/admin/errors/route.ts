import { NextRequest, NextResponse } from 'next/server';

interface AdminErrorReport {
  section: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const errorData: AdminErrorReport = await request.json();

    // Validate error data
    if (!errorData.message || !errorData.section || !errorData.timestamp) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz hata verisi' },
        { status: 400 }
      );
    }

    // Log admin error
    console.error(`Admin Error in ${errorData.section}:`, errorData);

    // Store admin error log
    await storeAdminErrorLog(errorData);

    // Send admin alert for critical errors
    if (errorData.message.toLowerCase().includes('critical') || 
        errorData.message.toLowerCase().includes('security')) {
      await sendAdminAlert(errorData);
    }

    return NextResponse.json({
      success: true,
      message: 'Admin hata raporu alındı',
    });

  } catch (error) {
    console.error('Admin error reporting failed:', error);
    return NextResponse.json(
      { success: false, error: 'Admin hata raporlama başarısız' },
      { status: 500 }
    );
  }
}

async function storeAdminErrorLog(errorData: AdminErrorReport) {
  try {
    // Example: Store in database using Prisma
    // await prisma.adminErrorLog.create({
    //   data: {
    //     section: errorData.section,
    //     message: errorData.message,
    //     stack: errorData.stack,
    //     componentStack: errorData.componentStack,
    //     url: errorData.url,
    //     userAgent: errorData.userAgent,
    //     timestamp: new Date(errorData.timestamp),
    //   },
    // });

    // For now, just log to console with admin prefix
    console.log(`[ADMIN ERROR] ${errorData.section}:`, errorData.message);
  } catch (error) {
    console.error('Failed to store admin error log:', error);
  }
}

async function sendAdminAlert(errorData: AdminErrorReport) {
  try {
    // Send email alert to admin team
    const alertData = {
      to: process.env.ADMIN_EMAIL || 'admin@mysonai.com',
      subject: `🚨 Admin Panel Critical Error - ${errorData.section}`,
      html: `
        <h2>Admin Panel Critical Error</h2>
        <p><strong>Section:</strong> ${errorData.section}</p>
        <p><strong>Message:</strong> ${errorData.message}</p>
        <p><strong>URL:</strong> ${errorData.url}</p>
        <p><strong>Time:</strong> ${errorData.timestamp}</p>
        <p><strong>User Agent:</strong> ${errorData.userAgent}</p>
        ${errorData.stack ? `<pre>${errorData.stack}</pre>` : ''}
      `,
    };

    // Send via email service (SendGrid, AWS SES, etc.)
    // await sendEmail(alertData);

    console.log('Admin alert sent for critical error:', errorData.section);
  } catch (error) {
    console.error('Failed to send admin alert:', error);
  }
}
