
export const SkeletonDashboard = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className='bg-secondary'>
        <header className='bg-primary shadow'>
          <div className='max-w-screen-xl 2xl:max-w-screen-2xl mx-auto py-6 px-4 md:px-10'>
            <div className='flex flex-col gap-2 text-white'>
              <div className='h-6 bg-gray-300 rounded w-48 animate-pulse mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-32 animate-pulse'></div>
            </div>
          </div>
        </header>

        <div className='max-w-screen-xl 2xl:max-w-screen-2xl mx-auto py-6 px-4 md:px-10'>
          <div className='py-6 sm:px-0'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className='bg-white overflow-hidden shadow rounded-lg flex flex-col'>
                  <div className='p-5 h-2/3 flex items-center gap-4'>
                    <div className='flex-shrink-0 bg-gray-300 rounded-md p-3 animate-pulse'></div>
                    <div className='h-6 bg-gray-300 rounded w-32 animate-pulse'></div>
                  </div>
                  <div className='bg-gray-50 px-5 py-3 h-1/3'>
                    <div className='h-4 bg-gray-300 rounded w-24 animate-pulse'></div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <div className='bg-white shadow rounded-lg'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='h-6 bg-gray-300 rounded w-48 animate-pulse mb-4'></div>
                  <div className='mt-5 flow-root min-h-[200px]'>
                    <ul className='-my-4 divide-y divide-gray-200'>
                      {Array(3).fill(0).map((_, index) => (
                        <li key={index} className='py-4'>
                          <div className='flex items-center space-x-4'>
                            <div className='flex-1 min-w-0'>
                              <div className='h-4 bg-gray-300 rounded w-32 animate-pulse mb-2'></div>
                              <div className='h-4 bg-gray-300 rounded w-48 animate-pulse'></div>
                            </div>
                            <div className='h-6 bg-gray-300 rounded w-16 animate-pulse'></div>
                            <div className='h-8 bg-gray-300 rounded w-24 animate-pulse'></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mt-6'>
                    <div className='h-10 bg-gray-300 rounded w-full animate-pulse'></div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <div className='bg-white shadow rounded-lg'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='h-6 bg-gray-300 rounded w-48 animate-pulse mb-4'></div>
                  <div className='mt-5'>
                    <div className='flex items-end'>
                      {Array(12).fill(0).map((_, index) => (
                        <div key={index} className='flex-1 text-center'>
                          <div className='relative'>
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='h-4 bg-gray-300 rounded w-8 animate-pulse'></div>
                            </div>
                            <div className='bg-gray-300 rounded-t animate-pulse' style={{ height: '40px' }}></div>
                          </div>
                          <div className='h-4 bg-gray-300 rounded w-8 animate-pulse mt-2'></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

