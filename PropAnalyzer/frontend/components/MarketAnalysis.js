import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * کامپوننت تحلیل بازار با نمودار
 */
export default function MarketAnalysis({ data }) {
  // آماده‌سازی داده برای نمودار شهرها
  const cityChartData = data.city_analysis?.map(city => ({
    name: city.city,
    'میانگین قیمت (میلیارد)': Math.round(city.avg_price / 1000000000),
    'قیمت هر متر (میلیون)': Math.round(city.avg_price_per_m2 / 1000000),
    'تعداد املاک': city.count
  })) || []

  // آماده‌سازی داده برای نمودار نوع ملک
  const propertyTypeData = data.property_type_analysis?.map(type => ({
    name: getPropertyTypeLabel(type.property_type),
    'میانگین قیمت': Math.round(type.avg_price / 1000000000),
    'تعداد': type.count
  })) || []

  const getPropertyTypeLabel = (type) => {
    const labels = {
      apartment: 'آپارتمان',
      villa: 'ویلا',
      office: 'دفتر کار',
      store: 'مغازه',
      land: 'زمین'
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-8">
      {/* تحلیل شهرها */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-6">🏙️ تحلیل قیمت بر اساس شهر</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'میانگین قیمت (میلیارد)') return [`${value} میلیارد`, 'میانگین قیمت']
                  if (name === 'قیمت هر متر (میلیون)') return [`${value} میلیون`, 'قیمت هر متر']
                  return [value, name]
                }}
              />
              <Legend />
              <Bar dataKey="میانگین قیمت (میلیارد)" fill="#3b82f6" name="میانگین قیمت" />
              <Bar dataKey="قیمت هر متر (میلیون)" fill="#10b981" name="قیمت هر متر" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* تحلیل نوع ملک */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-6">🏠 تحلیل بر اساس نوع ملک</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={propertyTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'میانگین قیمت') return [`${value} میلیارد`, 'میانگین قیمت']
                  return [value, name]
                }}
              />
              <Legend />
              <Bar dataKey="میانگین قیمت" fill="#8b5cf6" name="میانگین قیمت (میلیارد)" />
              <Bar dataKey="تعداد" fill="#f59e0b" name="تعداد املاک" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* توزیع قیمت */}
      {data.price_trends && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-6">💰 توزیع قیمت در بازار</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl text-blue-600 mb-2">🟢</div>
              <h3 className="font-semibold text-gray-800">زیر ۵۰ میلیون</h3>
              <p className="text-2xl font-bold text-blue-600">
                {data.price_trends.price_distribution?.under_50M || 0}
              </p>
              <p className="text-sm text-gray-600">ملک</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl text-green-600 mb-2">🟡</div>
              <h3 className="font-semibold text-gray-800">۵۰ تا ۱۰۰ میلیون</h3>
              <p className="text-2xl font-bold text-green-600">
                {data.price_trends.price_distribution?.['50M_100M'] || 0}
              </p>
              <p className="text-sm text-gray-600">ملک</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl text-red-600 mb-2">🔴</div>
              <h3 className="font-semibold text-gray-800">بالای ۱۰۰ میلیون</h3>
              <p className="text-2xl font-bold text-red-600">
                {data.price_trends.price_distribution?.over_100M || 0}
              </p>
              <p className="text-sm text-gray-600">ملک</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}