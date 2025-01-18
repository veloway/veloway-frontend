import React from 'react';

const SkeletonShipmentFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1565c0]/5 to-[#f8fafc] w-full">
      {/* Status Banner Skeleton */}
      <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] text-white">
        <div className="containerMarginResposive py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
            <div className="px-4 py-2 rounded-full border bg-gray-300 animate-pulse w-40"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="containerMarginResposive py-8">
        {/* Header Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div>
                <div className="h-6 bg-gray-300 rounded w-48 animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="w-full md:w-auto bg-gray-300 animate-pulse h-10 rounded-xl"></div>
          </div>
        </div>

        {/* Progress Steps Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center w-full">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                {index < 3 && (
                  <div className="absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 bg-gray-300 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Route Skeleton */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {Array(2).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-6 bg-gray-300 rounded w-24 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Customer Info Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-48 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Array(2).fill(0).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse mb-1"></div>
                <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonShipmentFound;
