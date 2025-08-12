import React, { useEffect, useState, useContext } from 'react';
import { AddContext } from '../../context/AddContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const { currency } = useContext(AddContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <Loading />;

  return (
    <div className='min-h-screen bg-white p-6'>
      <h1 className='text-2xl font-semibold mb-6 text-gray-800'>Dashboard</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        {/* Enrollments */}
        <div className='flex items-center gap-4 border border-blue-300 p-4 rounded-md shadow-sm'>
          <img src={assets.patients_icon} alt="students" className='w-10 h-10' />
          <div>
            <p className='text-xl font-medium text-gray-700'>
              {dashboardData.enrolledStudentsData?.length ?? 0}
            </p>
            <p className='text-sm text-gray-500'>Total Enrollments</p>
          </div>
        </div>

        {/* Courses */}
        <div className='flex items-center gap-4 border border-blue-300 p-4 rounded-md shadow-sm'>
          <img src={assets.appointments_icon} alt="courses" className='w-10 h-10' />
          <div>
            <p className='text-xl font-medium text-gray-700'>
              {dashboardData.totalCourses ?? 0}
            </p>
            <p className='text-sm text-gray-500'>Total Courses</p>
          </div>
        </div>

        {/* Earnings */}
        <div className='flex items-center gap-4 border border-blue-300 p-4 rounded-md shadow-sm'>
          <img src={assets.earning_icon} alt="earnings" className='w-10 h-10' />
          <div>
            <p className='text-xl font-medium text-gray-700'>
              {currency}{(dashboardData.totalEarnings ?? 0).toFixed(2)}
            </p>
            <p className='text-sm text-gray-500'>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollments Table */}
      <div>
        <h2 className='pb-4 text-lg font-medium text-gray-800'>Latest Enrollments</h2>
        <div className='w-full overflow-x-auto rounded-md border border-gray-300'>
          <table className='min-w-full table-auto'>
            <thead className='bg-gray-50 text-gray-900 border-b border-gray-200 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                <th className='px-4 py-3 font-semibold'>Student Name</th>
                <th className='px-4 py-3 font-semibold'>Course Title</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-700'>
              {dashboardData.enrolledStudentsData?.map((item, index) => (
                <tr key={index} className='border-b border-gray-200'>
                  <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                  <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                    <img
                      src={item.student?.imageUrl || '/default-profile.png'}
                      alt="profile"
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <span className='truncate'>{item.student?.name || 'Unknown'}</span>
                  </td>
                  <td className='px-4 py-3 truncate'>{item.courseTitle || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
