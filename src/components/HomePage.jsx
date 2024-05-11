import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (newMovies) => {
    setMovies(newMovies);
  };

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `${baseUrl}/search/movie?api_key=${Api_key}&language=en-US&query=${query}&page=1`
      );
      if (!res.ok) {
        throw new Error('Failed to search movies');
      }
      const data = await res.json();
      setMovies(data.results);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Navbar onCategoryChange={handleCategoryChange} onSearch={handleSearch} onPageChange={handlePageChange} currentPage={currentPage} />
      <div className="pt-5 bg-gray-500 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 shadow-2xl shadow--800">
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center">
            <Link to={`/movieDetails/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-72 mb-2 rounded-lg cursor-pointer shadow-lg shadow-gray-600"
              />
            </Link>
            <div className='text-left'>
              <p className="text-white">{movie.title}</p>
              <p className="text-white">Rating: {movie.vote_average}/10</p>
            </div>
          </div>
        ))}
      </div>

      <div className='p-5 bg-gray-500 flex justify-center items-center'>
        <button
          onClick={handlePrevClick}
          className='mr-16 p-1 px-2 border border-black rounded shadow-xl cursor-pointer bg-gray-400'
        >
          &lt;&lt; Previous
        </button>
        <button
          onClick={handleNextClick}
          className='mr-16 p-1 px-2 border border-black rounded shadow-xl cursor-pointer bg-gray-400'
        >
          Next &gt;&gt;
        </button>
      </div>
    </>
  );
}

export default HomePage;
