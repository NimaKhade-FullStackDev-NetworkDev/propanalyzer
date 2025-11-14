import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import PropertyCard from '@/components/PropertyCard'
import SearchFilters from '@/components/SearchFilters'
import StatsOverview from '@/components/StatsOverview'

/**
 * صفحه اصلی - نمایش املاک و جستجو
 */
export default function Home() {
  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  // دریافت داده‌ها از API
  useEffect(() => {
    fetchListings()
    fetchStats()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/listings/')
      setListings(response.data.results || response.data)
      setFilteredListings(response.data.results || response.data)
    } catch (err) {
      console.error('Error fetching listings:', err)
      setError('خطا در دریافت داده‌ها')
      // داده‌های نمونه برای توسعه
      setListings(sampleListings)
      setFilteredListings(sampleListings)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/listings/stats/')
      setStats(response.data)
    } catch (err) {
      console.error('Error fetching stats:', err)
      // آمار نمونه
      setStats({
        overall: {
          total_listings: sampleListings.length,
          avg_price: Math.round(sampleListings.reduce((sum, item) => sum + item.price, 0) / sampleListings.length),
          avg_price_per_m2: Math.round(sampleListings.reduce((sum, item) => sum + (item.price / item.area), 0) / sampleListings.length)
        }
      })
    }
  }

  // فیلتر کردن املاک
  const handleFilter = (filters) => {
    let filtered = listings

    if (filters.city) {
      filtered = filtered.filter(item => 
        item.city.includes(filters.city)
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(item => item.price >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(item => item.price <= filters.maxPrice)
    }

    if (filters.propertyType) {
      filtered = filtered.filter(item => item.property_type === filters.propertyType)
    }

    setFilteredListings(filtered)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">خطا در ارتباط با سرور</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchListings}
            className="btn-primary"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>PropAnalyzer - تحلیل بازار مسکن ایران</title>
        <meta name="description" content="پلتفرم تحلیل و پیش‌بینی قیمت املاک با هوش مصنوعی" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* هدر */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PropAnalyzer
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              تحلیل هوشمند بازار مسکن ایران
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                📊 داشبورد تحلیلی
              </Link>
              <Link href="/predict" className="btn-secondary bg-blue-500 hover:bg-blue-600">
                🤖 پیش‌بینی قیمت
              </Link>
            </div>
          </div>
        </section>

        {/* آمار کلی */}
        {stats && <StatsOverview stats={stats} />}

        {/* فیلترهای جستجو */}
        <section className="container mx-auto px-4 py-8">
          <SearchFilters onFilter={handleFilter} />
        </section>

        {/* لیست املاک */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              املاک موجود
              {filteredListings.length > 0 && (
                <span className="text-sm text-gray-500 mr-2">
                  ({filteredListings.length} مورد)
                </span>
              )}
            </h2>
            
            <button 
              onClick={fetchListings}
              disabled={loading}
              className="btn-secondary text-sm"
            >
              {loading ? 'در حال بروزرسانی...' : '🔄 بروزرسانی'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="loading-spinner"></div>
              <p className="text-gray-600 mt-4">در حال دریافت داده‌ها...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ملکی یافت نشد</h3>
              <p className="text-gray-600">لطفاً فیلترهای جستجو را تغییر دهید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

// داده‌های نمونه برای توسعه
const sampleListings = [
  {
    id: 1,
    title: 'آپارتمان ۸۵ متری نوساز در الهیه',
    address: 'تهران، الهیه، خیابان فرشته',
    city: 'تهران',
    district: 'الهیه',
    price: 8500000000,
    area: 85,
    rooms: 2,
    year_built: 1400,
    property_type: 'apartment',
    condition: 'new',
    created_at: '2024-01-15T10:30:00Z'
  },
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
    condition: 'renovated',
    created_at: '2024-01-14T15:20:00Z'
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
    condition: 'normal',
    created_at: '2024-01-13T09:15:00Z'
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
    condition: 'new',
    created_at: '2024-01-12T14:45:00Z'
  },
  {
    id: 5,
    title: 'مغازه ۵۰ متری در پاسداران',
    address: 'تهران، پاسداران، خیابان ارتش',
    city: 'تهران',
    district: 'پاسداران',
    price: 7000000000,
    area: 50,
    rooms: 1,
    year_built: 1390,
    property_type: 'store',
    condition: 'normal',
    created_at: '2024-01-11T11:20:00Z'
  },
  {
    id: 6,
    title: 'آپارتمان ۹۵ متری در سعادت آباد',
    address: 'تهران، سعادت آباد، میدان کاج',
    city: 'تهران',
    district: 'سعادت آباد',
    price: 11000000000,
    area: 95,
    rooms: 2,
    year_built: 1397,
    property_type: 'apartment',
    condition: 'renovated',
    created_at: '2024-01-10T16:30:00Z'
  }
]