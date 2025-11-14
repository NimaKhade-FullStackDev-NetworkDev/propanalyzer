/**
 * کامپوننت نمایش آمار کلی
 */
export default function StatsOverview({ stats }) {
  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toLocaleString()
  }

  const formatPrice = (price) => {
    if (!price) return '0'
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + ' میلیارد'
    }
    return (price / 1000000).toFixed(0) + ' میلیون'
  }

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📊 آمار کلی بازار
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* تعداد املاک */}
          <div className="text-center">
            <div className="text-3xl text-blue-600 mb-2">🏠</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">تعداد املاک</h3>
            <p className="text-2xl font-bold text-gray-800">
              {formatNumber(stats.overall?.total_listings)}
            </p>
            <p className="text-sm text-gray-500 mt-1">ملک فعال</p>
          </div>

          {/* میانگین قیمت */}
          <div className="text-center">
            <div className="text-3xl text-green-600 mb-2">💰</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">میانگین قیمت</h3>
            <p className="text-2xl font-bold text-gray-800">
              {formatPrice(stats.overall?.avg_price)}
            </p>
            <p className="text-sm text-gray-500 mt-1">تومان</p>
          </div>

          {/* قیمت هر متر */}
          <div className="text-center">
            <div className="text-3xl text-purple-600 mb-2">📐</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">قیمت هر متر</h3>
            <p className="text-2xl font-bold text-gray-800">
              {formatPrice(stats.overall?.avg_price_per_m2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">تومان</p>
          </div>

          {/* میانگین متراژ */}
          <div className="text-center">
            <div className="text-3xl text-orange-600 mb-2">📏</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">میانگین متراژ</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.overall?.avg_area ? Math.round(stats.overall.avg_area) : '0'}
            </p>
            <p className="text-sm text-gray-500 mt-1">متر مربع</p>
          </div>
        </div>

        {/* توزیع شهرها */}
        {stats.by_city && stats.by_city.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              🏙️ توزیع املاک بر اساس شهر
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.by_city.slice(0, 6).map((city, index) => (
                <div key={city.city} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                    {index + 1}
                  </div>
                  <p className="font-semibold text-gray-800">{city.city}</p>
                  <p className="text-sm text-gray-600">{formatNumber(city.count)} ملک</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}