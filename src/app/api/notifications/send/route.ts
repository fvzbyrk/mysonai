import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PLANS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { userId, type, data } = await request.json()

    if (!userId || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Get user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name, plan, usage')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const plan = user.plan as keyof typeof PLANS
    const limits = PLANS[plan].limits

    let emailContent = ''
    let subject = ''

    switch (type) {
      case 'usage_warning':
        const usage = user.usage
        const messagesNearLimit = usage.totalMessages >= limits.messages * 0.8
        const tokensNearLimit = usage.totalTokens >= limits.tokens * 0.8
        
        if (messagesNearLimit || tokensNearLimit) {
          subject = 'MySonAI - Kullanım Limitiniz Yaklaşıyor'
          emailContent = `
            Merhaba ${user.name || 'Değerli Kullanıcımız'},
            
            Kullanım limitinizin %80'ine yaklaştığınızı bildirmek istiyoruz.
            
            Mevcut Kullanımınız:
            • Mesajlar: ${usage.totalMessages}/${limits.messages}
            • Tokenlar: ${usage.totalTokens}/${limits.tokens}
            
            Limit aşıldığında yeni özellikler kullanılamayacak. 
            Pro plana geçerek sınırsız erişim kazanabilirsiniz.
            
            Pro Plan Avantajları:
            • 1000 mesaj/ay (10x daha fazla)
            • Tüm 18 AI asistan erişimi
            • Öncelikli destek
            • Sadece 99₺/ay
            
            Hemen yükseltmek için: ${process.env.NEXT_PUBLIC_SITE_URL}/pricing
            
            Sorularınız için: info@mysonai.com
            
            MySonAI Ekibi
          `
        }
        break

      case 'limit_exceeded':
        subject = 'MySonAI - Kullanım Limiti Aşıldı'
        emailContent = `
          Merhaba ${user.name || 'Değerli Kullanıcımız'},
          
          Kullanım limitinizi aştığınızı bildirmek istiyoruz.
          
          Limit aşıldığında yeni AI asistanları kullanamazsınız.
          Pro plana geçerek sınırsız erişim kazanabilirsiniz.
          
          Pro Plan Avantajları:
          • 1000 mesaj/ay (10x daha fazla)
          • Tüm 18 AI asistan erişimi
          • Öncelikli destek
          • Sadece 99₺/ay
          
          Hemen yükseltmek için: ${process.env.NEXT_PUBLIC_SITE_URL}/pricing
          
          Sorularınız için: info@mysonai.com
          
          MySonAI Ekibi
        `
        break

      case 'subscription_cancelled':
        subject = 'MySonAI - Aboneliğiniz İptal Edildi'
        emailContent = `
          Merhaba ${user.name || 'Değerli Kullanıcımız'},
          
          Aboneliğinizin iptal edildiğini bildirmek istiyoruz.
          
          Mevcut dönem sonuna kadar Pro özelliklerini kullanmaya devam edebilirsiniz.
          Dönem sonunda otomatik olarak ücretsiz plana geçeceksiniz.
          
          Tekrar Pro plana geçmek isterseniz:
          ${process.env.NEXT_PUBLIC_SITE_URL}/pricing
          
          Sorularınız için: info@mysonai.com
          
          MySonAI Ekibi
        `
        break

      case 'subscription_renewed':
        subject = 'MySonAI - Aboneliğiniz Yenilendi'
        emailContent = `
          Merhaba ${user.name || 'Değerli Kullanıcımız'},
          
          Aboneliğinizin başarıyla yenilendiğini bildirmek istiyoruz.
          
          Pro özelliklerinizi kullanmaya devam edebilirsiniz:
          • 1000 mesaj/ay
          • Tüm 18 AI asistan erişimi
          • Öncelikli destek
          
          Sorularınız için: info@mysonai.com
          
          MySonAI Ekibi
        `
        break

      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 })
    }

    // In a real implementation, you would send the email here
    // For now, we'll just log it
    console.log('Email notification:', {
      to: user.email,
      subject,
      content: emailContent
    })

    // Store notification in database
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: type,
        subject: subject,
        content: emailContent,
        sent_at: new Date().toISOString()
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
