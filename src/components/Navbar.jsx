import React, { useState, useEffect } from 'react';

function Navbar({ onCategoryChange, onPageChange, currentPage }) {
  const [activeButton, setActiveButton] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('popular');

  const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  const baseUrl = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => { 
      try {
        let url = '';
        if (searchQuery) {
          url = `${baseUrl}/search/movie?api_key=${Api_key}&language=en-US&query=${searchQuery}&page=${currentPage}`;
        } else {
          url = `${baseUrl}/movie/${category}?api_key=${Api_key}&language=en-US&page=${currentPage}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await res.json();
        onCategoryChange(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [category, currentPage, onCategoryChange, searchQuery]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
    setCategory(category);
    onPageChange(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-between items-center h-14 bg-gray-700 text-white px-6 shadow-2xl shadow-black">
      <h1 className='m-10 text-lg text-yellow-400'>
        Movies<strong className='text-xl'>X</strong>
      </h1>

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
          className='mr-1 p-1 pl-2 w-60 rounded outline-none text-black font-normal'
          type="text" 
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default Navbar;
