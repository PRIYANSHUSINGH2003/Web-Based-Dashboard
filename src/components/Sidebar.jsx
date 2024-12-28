import React from 'react';
import { FaUsers, FaBuilding, FaUpload, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="bg-sidebar bg-gray-800 w-30 p-6 h-screen flex flex-col">
            <h2 className="text-2xl font-semibold text-white mb-8">Dashboard</h2>
            <ul className="flex-1 space-y-6">
                <li className="flex items-center text-white hover:text-highlight transition duration-300">
                    <FaBuilding className="mr-3" /> Organizations
                </li>
                <li
                    className="flex items-center text-white hover:text-highlight transition duration-300 cursor-pointer"
                >
                    <FaUsers className="mr-3" /> Teams
                </li>
                <li className="flex items-center text-white hover:text-highlight transition duration-300">
                    <FaCog className="mr-3" /> Settings
                </li>
            </ul>
            <div className="mt-auto text-center text-white text-sm">
                <p className='mr-9'>&copy; 2024 Your Company</p>
            </div>
        </div>
    );
};

export default Sidebar;
