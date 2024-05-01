import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails"
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path={`/movieDetails/:movieID`} element={<MovieDetails/>}/>
      </Routes>
    </>
  )
}

export default App
