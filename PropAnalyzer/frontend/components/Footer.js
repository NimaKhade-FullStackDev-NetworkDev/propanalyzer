import Link from 'next/link'

/**
 * کامپوننت فوتر سایت
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* درباره ما */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">PropAnalyzer</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              پلتفرم هوشمند تحلیل بازار مسکن ایران. با استفاده از هوش مصنوعی و داده‌های واقعی، 
              بهترین تحلیل‌ها و پیش‌بینی‌ها را در اختیار شما قرار می‌دهیم.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                🐦
              </a>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h4 className="text-lg font-semibold mb-4">لینک‌های سریع</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  🏠 صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
                  📊 داشبورد تحلیل
                </Link>
              </li>
              <li>
                <Link href="/predict" className="text-gray-300 hover:text-white transition">
                  🤖 پیش‌بینی قیمت
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  ℹ️ درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* تماس با ما */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="ml-2">📧</span>
                info@propanalyzer.ir
              </li>
              <li className="flex items-center">
                <span className="ml-2">📞</span>
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center">
                <span className="ml-2">📍</span>
                تهران، ایران
              </li>
            </ul>
          </div>
        </div>

        {/* کپی رایت */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} PropAnalyzer. تمام حقوق محفوظ است.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            ساخته شده با ❤️ برای جامعه ایرانی
          </p>
        </div>
      </div>
    </footer>
  )
}