import React, { useState } from 'react';

function Navbar({ onCategoryChange, onSearch }) {
  const [activeButton, setActiveButton] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonClick = (category) => {
    setActiveButton(category);
    onCategoryChange(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-between items-center h-14 bg-gray-700 text-white px-6 shadow-2xl shadow-black">
      <button className='m-10 text-lg text-yellow-400'>
        Movies<strong className='text-xl'>X</strong>
      </button>

      <div className="flex">
        <button
          onClick={() => handleButtonClick('popular')}
          className={`m-16 text-lg cursor-pointer ${activeButton === 'popular' ? 'font-bold text-yellow-400' : ''}`}
        >
          Popular
        </button>
        <button
          onClick={() => handleButtonClick('top_rated')}
          className={`m-16 text-lg cursor-pointer ${activeButton === 'top_rated' ? 'font-bold text-yellow-400' : ''}`}
        >
          Top Rated
        </button>
        <button
          onClick={() => handleButtonClick('upcoming')}
          className={`m-16 text-lg cursor-pointer ${activeButton === 'upcoming' ? 'font-bold text-yellow-400' : ''}`}
        >
          Upcoming
        </button>
      </div>

      <div className="flex items-center">
        <input
          className='mr-1 p-1 pl-2 rounded outline-none text-black font-normal'
          type="text" 
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button 
          onClick={handleSearchSubmit}
          className='mr-16 p-1 border border-gray-600 rounded shadow-xl cursor-pointer bg-gray-700'
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;
