import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, UserCheck, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - MySonAI',
  description: 'MySonAI gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Gizlilik Politikası</h1>
          <p className="text-gray-300 text-lg">Kişisel verilerinizin korunması bizim için önemlidir</p>
          <p className="text-gray-400 text-sm mt-2">Son güncelleme: 18 Aralık 2024</p>
        </div>

        <div className="space-y-8">
          {/* Giriş */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Giriş</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                MySonAI olarak, kişisel verilerinizin güvenliği ve gizliliği bizim için en önemli önceliklerden biridir. 
                Bu gizlilik politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği 
                Genel Veri Koruma Yönetmeliği (GDPR) kapsamında, kişisel verilerinizin nasıl toplandığını, 
                işlendiğini ve korunduğunu açıklamaktadır.
              </p>
            </div>
          </Card>

          {/* Veri Toplama */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Toplanan Veriler</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Kimlik Verileri</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Ad, soyad</li>
                    <li>• E-posta adresi</li>
                    <li>• Telefon numarası (isteğe bağlı)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Teknik Veriler</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• IP adresi</li>
                    <li>• Tarayıcı bilgileri</li>
                    <li>• Cihaz bilgileri</li>
                    <li>• Kullanım logları</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">İçerik Verileri</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Chat geçmişi</li>
                    <li>• Yüklenen dosyalar</li>
                    <li>• Kullanıcı tercihleri</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Veri İşleme Amaçları */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Veri İşleme Amaçları</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Hizmet Sunumu</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• AI asistan hizmetleri</li>
                    <li>• Kullanıcı hesap yönetimi</li>
                    <li>• Teknik destek</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Geliştirme</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Hizmet iyileştirme</li>
                    <li>• Yeni özellik geliştirme</li>
                    <li>• Performans analizi</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Güvenlik</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Güvenlik tehditlerini önleme</li>
                    <li>• Yetkisiz erişimi engelleme</li>
                    <li>• Dolandırıcılık tespiti</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Yasal Yükümlülükler</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Yasal gereklilikler</li>
                    <li>• Mahkeme kararları</li>
                    <li>• Denetim süreçleri</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Veri Saklama */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Veri Saklama Süreleri</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white font-medium">Hesap verileri</span>
                  <span className="text-gray-300">Hesap aktif olduğu sürece</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white font-medium">Chat geçmişi</span>
                  <span className="text-gray-300">2 yıl</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white font-medium">Teknik loglar</span>
                  <span className="text-gray-300">1 yıl</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white font-medium">Yasal yükümlülük verileri</span>
                  <span className="text-gray-300">Yasal süre boyunca</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Kullanıcı Hakları */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <UserCheck className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Kullanıcı Hakları</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bilgi Alma Hakkı</h3>
                  <p className="text-gray-300 text-sm">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Erişim Hakkı</h3>
                  <p className="text-gray-300 text-sm">İşlenen kişisel verilerinize erişim talep etme</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Düzeltme Hakkı</h3>
                  <p className="text-gray-300 text-sm">Yanlış veya eksik verilerin düzeltilmesini isteme</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Silme Hakkı</h3>
                  <p className="text-gray-300 text-sm">Kişisel verilerinizin silinmesini talep etme</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">İtiraz Hakkı</h3>
                  <p className="text-gray-300 text-sm">Veri işlemeye itiraz etme</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Taşınabilirlik Hakkı</h3>
                  <p className="text-gray-300 text-sm">Verilerinizi başka bir hizmete aktarma</p>
                </div>
              </div>
            </div>
          </Card>

          {/* İletişim */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <div className="p-8">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">İletişim</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white font-semibold mb-2">E-posta:</p>
                  <p className="text-gray-300">privacy@mysonai.com</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white font-semibold mb-2">Adres:</p>
                  <p className="text-gray-300">
                    MySonAI Teknoloji A.Ş.<br />
                    İstanbul, Türkiye
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}