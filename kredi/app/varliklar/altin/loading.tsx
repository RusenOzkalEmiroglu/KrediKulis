export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Bölümü Skeleton */}
      <div className="bg-gradient-to-r from-amber-300 to-yellow-300 rounded-xl p-8 mb-10 animate-pulse">
        <div className="h-10 bg-amber-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-amber-200 rounded w-full mb-2"></div>
        <div className="h-6 bg-amber-200 rounded w-2/3 mb-6"></div>
        <div className="h-4 bg-amber-200 rounded w-1/3"></div>
      </div>

      {/* Altın Fiyatları Tablosu Skeleton */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        <div className="p-6 border-b border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="p-6">
          <div className="animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-8 bg-amber-100 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="flex space-x-8">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bilgi Kartları Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Hesaplama Aracı Skeleton */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="bg-amber-50 rounded-lg p-6">
          <div className="h-4 bg-amber-100 rounded w-1/2"></div>
        </div>
      </div>

      {/* SSS Bölümü Skeleton */}
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        
        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
