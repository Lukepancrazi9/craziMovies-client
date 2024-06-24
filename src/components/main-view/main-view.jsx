import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "Saving Private Ryan",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Saving_Private_Ryan_poster.jpg/220px-Saving_Private_Ryan_poster.jpg",
        director: "Steven Spielberg"
      },
      {
        id: 2,
        title: "Sicario",
        image:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Sicario_poster.jpg/220px-Sicario_poster.jpg",
        director: "Denis Villeneuve"
      },
      {
        id: 3,
        title: "The Dark Knight",
        image:
          "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        director: "Christopher Nolan"
      }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
      return (
         <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }

    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }

    return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
      ))}
    </div>
  );
};