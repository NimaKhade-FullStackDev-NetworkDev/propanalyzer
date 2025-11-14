import { useState } from 'react'

/**
 * کامپوننت فرم پیش‌بینی قیمت
 */
export default function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    area: '',
    rooms: '2',
    year_built: '',
    city: 'تهران',
    district: '',
    property_type: 'apartment',
    condition: 'normal'
  })

  const cities = ['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'کرج']
  const propertyTypes = [
    { value: 'apartment', label: 'آپارتمان' },
    { value: 'villa', label: 'ویلا' },
    { value: 'office', label: 'دفتر کار' },
    { value: 'store', label: 'مغازه' },
    { value: 'land', label: 'زمین' }
  ]
  const conditions = [
    { value: 'new', label: 'نوساز' },
    { value: 'renovated', label: 'بازسازی شده' },
    { value: 'normal', label: 'معمولی' },
    { value: 'old', label: 'قدیمی' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // اعتبارسنجی
    if (!formData.area || formData.area < 10) {
      alert('متراژ باید حداقل ۱۰ متر باشد')
      return
    }

    if (!formData.year_built || formData.year_built < 1300 || formData.year_built > 1402) {
      alert('سال ساخت باید بین ۱۳۰۰ تا ۱۴۰۲ باشد')
      return
    }

    if (!formData.district) {
      alert('لطفاً منطقه یا محله را وارد کنید')
      return
    }

    // ارسال داده
    onSubmit({
      ...formData,
      area: parseFloat(formData.area),
      rooms: parseInt(formData.rooms),
      year_built: parseInt(formData.year_built)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* متراژ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📐 متراژ (متر مربع)
        </label>
        <input
          type="number"
          value={formData.area}
          onChange={(e) => handleChange('area', e.target.value)}
          className="input-field"
          placeholder="مثلاً ۸۵"
          min="10"
          max="1000"
          required
        />
        <p className="text-xs text-gray-500 mt-1">متراژ باید بین ۱۰ تا ۱۰۰۰ متر باشد</p>
      </div>

      {/* تعداد اتاق */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🚪 تعداد اتاق
        </label>
        <select
          value={formData.rooms}
          onChange={(e) => handleChange('rooms', e.target.value)}
          className="input-field"
        >
          <option value="0">بدون اتاق</option>
          <option value="1">۱ خوابه</option>
          <option value="2">۲ خوابه</option>
          <option value="3">۳ خوابه</option>
          <option value="4">۴ خوابه</option>
          <option value="5">۵ خوابه+</option>
        </select>
      </div>

      {/* سال ساخت */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🏗️ سال ساخت
        </label>
        <input
          type="number"
          value={formData.year_built}
          onChange={(e) => handleChange('year_built', e.target.value)}
          className="input-field"
          placeholder="مثلاً ۱۴۰۰"
          min="1300"
          max="1402"
          required
        />
        <p className="text-xs text-gray-500 mt-1">سال ساخت باید بین ۱۳۰۰ تا ۱۴۰۲ باشد</p>
      </div>

      {/* شهر */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🏙️ شهر
        </label>
        <select
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className="input-field"
          required
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* منطقه */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📍 منطقه یا محله
        </label>
        <input
          type="text"
          value={formData.district}
          onChange={(e) => handleChange('district', e.target.value)}
          className="input-field"
          placeholder="مثلاً الهیه، پاسداران و..."
          required
        />
      </div>

      {/* نوع ملک */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🏠 نوع ملک
        </label>
        <select
          value={formData.property_type}
          onChange={(e) => handleChange('property_type', e.target.value)}
          className="input-field"
        >
          {propertyTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* وضعیت ملک */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎯 وضعیت ملک
        </label>
        <select
          value={formData.condition}
          onChange={(e) => handleChange('condition', e.target.value)}
          className="input-field"
        >
          {conditions.map(condition => (
            <option key={condition.value} value={condition.value}>{condition.label}</option>
          ))}
        </select>
      </div>

      {/* دکمه ارسال */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="loading-spinner w-5 h-5 inline-block ml-2"></div>
            در حال پیش‌بینی...
          </>
        ) : (
          '🤖 پیش‌بینی قیمت'
        )}
      </button>

      {/* اطلاعات فرم */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 نکات مهم</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• دقت پیش‌بینی به دقت اطلاعات ورودی بستگی دارد</li>
          <li>• مدل بر اساس هزاران داده واقعی آموزش دیده است</li>
          <li>• نتایج صرفاً پیش‌بینی هستند و قطعیت ندارند</li>
        </ul>
      </div>
    </form>
  )
}