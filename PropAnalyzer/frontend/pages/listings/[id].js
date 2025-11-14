import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import LoadingSpinner from '@/components/LoadingSpinner'

/**
 * صفحه جزئیات هر ملک
 */
export default function ListingDetail() {
  const router = useRouter()
  const { id } = router.query
  
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [similarListings, setSimilarListings] = useState([])

  useEffect(() => {
    if (id) {
      fetchListingDetail(id)
      fetchSimilarListings(id)
    }
  }, [id])

  const fetchListingDetail = async (listingId) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8000/api/listings/${listingId}/`)
      setListing(response.data)
    } catch (err) {
      console.error('Error fetching listing:', err)
      setError('ملک مورد نظر یافت نشد')
      // داده نمونه برای توسعه
      setListing(sampleListing)
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarListings = async (listingId) => {
    try {
      // در اینجا می‌توانیم بر اساس شهر، نوع ملک و ... لیست مشابه پیدا کنیم
      const response = await axios.get('http://localhost:8000/api/listings/')
      const allListings = response.data.results || response.data
      const similar = allListings
        .filter(item => item.id !== parseInt(listingId))
        .slice(0, 3)
      setSimilarListings(similar)
    } catch (err) {
      console.error('Error fetching similar listings:', err)
      setSimilarListings(sampleListings.filter(item => item.id !== parseInt(listingId)).slice(0, 3))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">🏚️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ملک یافت نشد</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="btn-primary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{listing?.title} - PropAnalyzer</title>
        <meta name="description" content={listing?.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* دکمه بازگشت */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            ← بازگشت به لیست املاک
          </Link>
        </div>

        {/* محتوای اصلی */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* اطلاعات اصلی */}
            <div className="lg:col-span-2">
              <div className="card">
                {/* هدر */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {listing.title}
                  </h1>
                  <p className="text-gray-600 flex items-center">
                    <span className="ml-2">📍</span>
                    {listing.address}
                  </p>
                </div>

                {/* قیمت */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">قیمت</h3>
                      <p className="text-3xl font-bold text-green-600">
                        {listing.price.toLocaleString()} تومان
                      </p>
                      {listing.area && (
                        <p className="text-gray-600 mt-1">
                          قیمت هر متر: {(listing.price / listing.area).toLocaleString()} تومان
                        </p>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        listing.condition === 'new' ? 'bg-green-100 text-green-800' :
                        listing.condition === 'renovated' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {listing.condition === 'new' && '🆕 نوساز'}
                        {listing.condition === 'renovated' && '🔄 بازسازی شده'}
                        {listing.condition === 'normal' && '✅ معمولی'}
                        {listing.condition === 'old' && '🏚️ قدیمی'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* مشخصات فنی */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">📐</div>
                    <h4 className="text-sm text-gray-600 mb-1">متراژ</h4>
                    <p className="font-semibold text-gray-800">{listing.area} متر</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🚪</div>
                    <h4 className="text-sm text-gray-600 mb-1">اتاق</h4>
                    <p className="font-semibold text-gray-800">{listing.rooms} خوابه</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🏗️</div>
                    <h4 className="text-sm text-gray-600 mb-1">سال ساخت</h4>
                    <p className="font-semibold text-gray-800">{listing.year_built}</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-2">🏠</div>
                    <h4 className="text-sm text-gray-600 mb-1">نوع ملک</h4>
                    <p className="font-semibold text-gray-800">
                      {listing.property_type === 'apartment' && 'آپارتمان'}
                      {listing.property_type === 'villa' && 'ویلا'}
                      {listing.property_type === 'office' && 'دفتر کار'}
                      {listing.property_type === 'store' && 'مغازه'}
                      {listing.property_type === 'land' && 'زمین'}
                    </p>
                  </div>
                </div>

                {/* توضیحات */}
                {listing.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">توضیحات</h3>
                    <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                  </div>
                )}

                {/* موقعیت */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">موقعیت مکانی</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>شهر:</strong> {listing.city}</p>
                    <p><strong>منطقه:</strong> {listing.district}</p>
                    {listing.neighborhood && (
                      <p><strong>محله:</strong> {listing.neighborhood}</p>
                    )}
                    <p><strong>آدرس کامل:</strong> {listing.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* سایدبار */}
            <div className="space-y-6">
              {/* اطلاعات تماس */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📞 اطلاعات تماس</h3>
                <div className="space-y-3">
                  {listing.contact_name && (
                    <div>
                      <p className="text-sm text-gray-600">نام</p>
                      <p className="font-semibold">{listing.contact_name}</p>
                    </div>
                  )}
                  {listing.contact_phone && (
                    <div>
                      <p className="text-sm text-gray-600">تلفن</p>
                      <p className="font-semibold">{listing.contact_phone}</p>
                    </div>
                  )}
                  <button className="w-full btn-primary mt-4">
                    تماس با مالک
                  </button>
                </div>
              </div>

              {/* املاک مشابه */}
              {similarListings.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">🏠 املاک مشابه</h3>
                  <div className="space-y-4">
                    {similarListings.map((similar) => (
                      <Link 
                        key={similar.id}
                        href={`/listings/${similar.id}`}
                        className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                      >
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">
                          {similar.title}
                        </h4>
                        <p className="text-green-600 font-semibold text-sm">
                          {similar.price.toLocaleString()} تومان
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {similar.area} متر - {similar.district}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* ابزارها */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🛠️ ابزارهای مفید</h3>
                <div className="space-y-3">
                  <Link 
                    href="/predict"
                    className="block w-full text-center btn-secondary"
                  >
                    🤖 پیش‌بینی قیمت مشابه
                  </Link>
                  <button className="w-full btn-primary">
                    💰 محاسبه وام
                  </button>
                  <button className="w-full btn-secondary">
                    📊 تحلیل منطقه
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// داده‌های نمونه برای توسعه
const sampleListing = {
  id: 1,
  title: 'آپارتمان ۸۵ متری نوساز در الهیه',
  description: 'آپارتمان بسیار زیبا و نوساز در بهترین نقطه الهیه. دارای پارکینگ، انباری، آسانسور و سیستم گرمایش مرکزی. موقعیت عالی و دسترسی آسان به مراکز خرید و امکانات رفاهی.',
  address: 'تهران، الهیه، خیابان فرشته، کوچه آرامش، پلاک ۱۲',
  city: 'تهران',
  district: 'الهیه',
  neighborhood: 'فرشته',
  price: 8500000000,
  area: 85,
  rooms: 2,
  year_built: 1400,
  property_type: 'apartment',
  condition: 'new',
  contact_name: 'احمد محمدی',
  contact_phone: '09123456789',
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-15T10:30:00Z'
}

const sampleListings = [
  {
    id: 2,
    title: 'ویلا ۲۰۰ متری در فرمانیه',
    address: 'تهران، فرمانیه، خیابان باهنر',
    city: 'تهران',
    district: 'فرمانیه',
    price: 25000000000,
    area: 200,
    rooms: 4,
    year_built: 1395,
    property_type: 'villa',
    condition: 'renovated'
  },
  {
    id: 3,
    title: 'آپارتمان ۱۲۰ متری در نیاوران',
    address: 'تهران، نیاوران، خیابان یاسر',
    city: 'تهران',
    district: 'نیاوران',
    price: 12000000000,
    area: 120,
    rooms: 3,
    year_built: 1398,
    property_type: 'apartment',
    condition: 'normal'
  },
  {
    id: 4,
    title: 'آپارتمان ۷۵ متری در تجریش',
    address: 'تهران، تجریش، میدان تجریش',
    city: 'تهران',
    district: 'تجریش',
    price: 9500000000,
    area: 75,
    rooms: 2,
    year_built: 1399,
    property_type: 'apartment',
    condition: 'new'
  }
]