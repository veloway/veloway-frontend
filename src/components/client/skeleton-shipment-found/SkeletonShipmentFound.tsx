import { Skeleton } from '@mui/material';

const SkeletonShipmentFound = () => {
  return (
    <div className="bg-gradient-to-b from-[#1565c0]/5 to-[#f8fafc] w-full flex flex-col">
    <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] text-white">
      <div className="containerMarginResposive py-6">
        <Skeleton variant="text" width={200} height={40} />
      </div>
    </div>
    <div className="containerMarginResposive py-8 w-full flex flex-col justify-between flex-1 gap-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width={200} height={30} />
      </div>
      <div className="py-6">
        <Skeleton variant="rectangular" width="100%" height={80} />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width="100%" height={20} />
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width="100%" height={20} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={50} height={30} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={50} height={30} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={50} height={30} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={50} height={30} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default SkeletonShipmentFound;
