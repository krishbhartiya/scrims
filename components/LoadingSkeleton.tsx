export default function LoadingSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#18181B] rounded-xl overflow-hidden border border-[#2D2D31] animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="aspect-video bg-gradient-to-r from-[#2D2D31] via-[#3D3D41] to-[#2D2D31] animate-shimmer" />
            
            {/* Info skeleton */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                {/* Avatar skeleton */}
                <div className="w-12 h-12 bg-gradient-to-r from-[#2D2D31] via-[#3D3D41] to-[#2D2D31] rounded-full flex-shrink-0 animate-shimmer" />
                
                {/* Text skeleton */}
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 bg-gradient-to-r from-[#2D2D31] via-[#3D3D41] to-[#2D2D31] rounded w-3/4 animate-shimmer" />
                  <div className="h-3 bg-gradient-to-r from-[#2D2D31] via-[#3D3D41] to-[#2D2D31] rounded w-1/2 animate-shimmer" />
                  <div className="h-3 bg-gradient-to-r from-[#2D2D31] via-[#3D3D41] to-[#2D2D31] rounded w-2/3 animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
