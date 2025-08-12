import React, { useContext } from 'react';
import { AddContext } from '../../context/AddContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const { isEducator } = useContext(AddContext);

  const educatorMenu = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  const studentMenu = [
    { name: 'Dashboard', path: '/student', icon: assets.home_icon },
    { name: 'My Courses', path: '/student/my-courses', icon: assets.my_course_icon },
    { name: 'Certificates', path: '/student/certificates', icon: assets.certificate_icon },
  ];

  const menuItems = isEducator ? educatorMenu : studentMenu;

  return (
    <div className="w-56 border-r min-h-screen border-gray-300 py-6 flex flex-col bg-white">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end={item.path === (isEducator ? '/educator' : '/student')}
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200
            ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90 ' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:boder-gray-100/90'}`
          }>
          <img src={item.icon} alt={item.name} className="w-6 h-6" />
          <span className="text-base">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
