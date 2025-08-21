export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Skeleton */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>

              <nav className="space-y-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-200 pt-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            <div className="space-y-8">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
