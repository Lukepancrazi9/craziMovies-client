import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://crazi-movies-5042ca35c2c0.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies)})
          .catch(e=>console.log(e))
          
      }, []);
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
//         const moviesFromApi = movies.map((movie) => {
//           return {
//             id: movie._id,
//             title: movie.title,
//             description: movie.description,
//             genre: movie.genre,
//             director: movie.director,
//             featured: movie.featured
//           };
//         });

//         setMovies(moviesFromApi);
//       });
//     }, []);

//     if (selectedMovie) {
//       let similarMovies = movies.filter((movie) => 
//         movie.title !== selectedMovie.title &&
//         movie.genre.name === selectedMovie.genre.name);
//       return (
//         <>
//             <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
//             <hr />
//             {similarMovies.length > 0 && <h2>Similar movies</h2>}
//             {similarMovies.map((movie) =>
//                 <MovieCard key={movie.id}
//                     movie={movie}
//                     onMovieClick={(newSelectedMovie) => {
//                         setSelectedMovie(movie);
//                     }}
//                 />)}
//         </>
//       );
//   }

    if (movies.length === 0) {
      return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie._id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      ))}
    </div>
  );
};