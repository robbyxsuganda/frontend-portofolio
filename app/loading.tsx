import Skeleton from "@/app/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton width={150} height={32} className="rounded-full" />
              <Skeleton height={60} width="80%" />
              <Skeleton height={40} width="60%" />
              <Skeleton variant="text" count={3} />
              <div className="flex gap-4">
                <Skeleton width={140} height={48} className="rounded-lg" />
                <Skeleton width={140} height={48} className="rounded-lg" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton variant="circular" width={384} height={384} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
