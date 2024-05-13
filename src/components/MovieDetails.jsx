import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieDetails() { 
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const { movieID } = useParams();
  const [activeButton, setActiveButton] = useState('popular');

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
        if (!res.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCast = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`);
        if (!res.ok) {
          throw new Error('Failed to fetch cast');
        }
        const data = await res.json();
        setCast(data.cast.filter(actor => actor.profile_path));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
    fetchCast();
  }, [movieID, API_KEY]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center h-14 bg-gray-700 text-white px-6 shadow-2xl shadow-black">
        <h1 className='m-10 text-lg text-yellow-400'>
          Movies<strong className='text-xl'>X</strong>
        </h1>

        <div className="flex mr-96">
          <Link
            to={'/'}
            onClick={() => handleButtonClick('popular')}
            className={`m-16 text-lg cursor-pointer ${activeButton === 'popular' ? 'font-bold text-yellow-400' : ''}`}
          >
            Popular
          </Link>
          <Link
            to={'/'}
            onClick={() => handleButtonClick('top_rated')}
            className={`m-16 text-lg cursor-pointer ${activeButton === 'top_rated' ? 'font-bold text-yellow-400' : ''}`}
          >
            Top Rated
          </Link>
          <Link
            to={'/'}
            onClick={() => handleButtonClick('upcoming')}
            className={`m-16 text-lg cursor-pointer ${activeButton === 'upcoming' ? 'font-bold text-yellow-400' : ''}`}
          >
            Upcoming
          </Link>
        </div>
      </div>
      
      <div className="bg-gray-500 flex justify-center items-center">
        {details && (
          <div className="m-5 p-2 flex flex-col md:flex-row items-center md:justify-start bg-gray-800 rounded-lg shadow-lg shadow-gray-600">
            <div className=" md:w-2/3 flex justify-center items-center p-2">
              <img
                className="md:m-5 h-auto md:h-72 w-auto md:w-48 rounded"
                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                alt="Poster"
              />
            </div>
            <div className="md:mt-8 md:ml-8">
              <div>
                <h1 className="text-white text-xl mb-1"><strong>{details.title}</strong></h1>
                <p className="text-blue-400 mb-1">Rating: {details.vote_average}/10</p>
                <p className="text-white mb-1">Release Date: {details.release_date}</p>
                <p className="text-white mb-1">Runtime: {details.runtime} mins</p>
                <p className="text-blue-400 mb-1">Genres: {details.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              <h1 className='text-white text-xl'>Overview</h1>
              <p className="text-white mt-1">{details.overview}</p>
            </div>
          </div>
        )}
      </div>
      <h1 className="pl-16 text-white text-2xl bg-gray-500">Cast</h1>
      <div className="flex-1 bg-gray-500">
        <div className="text-white p-5 flex flex-wrap justify-center">
          {cast.map(actor => (
            <div key={actor.id} className="flex flex-col items-center m-3">
              <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} className="w-32 h-40 mb-2 rounded-md shadow-lg shadow-gray-600" />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
