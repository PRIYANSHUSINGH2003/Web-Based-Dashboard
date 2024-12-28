import React from 'react';
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-2xl font-bold tracking-wide">Welcome to the Dashboard</h1>
            <div className="flex items-center space-x-6">
                <FaSearch 
                    className="cursor-pointer text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-300"
                    size={24} 
                />
                <FaBell 
                    className="cursor-pointer text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-300"
                    size={24} 
                />
                <FaUserCircle 
                    className="cursor-pointer text-gray-400 hover:text-white transition-transform transform hover:scale-110 duration-300"
                    size={30} 
                />
            </div>
        </div>
    );
};

export default Header;
