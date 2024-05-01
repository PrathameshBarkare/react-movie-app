import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function HomePage(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('popular');

  const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  const baseUrl = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/movie/${category}?api_key=${Api_key}&language=en-US&page=${page}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePrevClick = () => {
    setPage((page) => page - 1);
  };

  const handleNextClick = () => {
    setPage((page) => page + 1);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
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
