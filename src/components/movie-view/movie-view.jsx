import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { MovieID } = useParams();

  // Log MovieID and movies array for debugging
  console.log("MovieId from URL:", MovieID);
  console.log("Movies array:", movies);

  // Find the movie based on MovieId
  const movie = movies.find((m) => m.Id === MovieID);

  // Log the found movie for debugging
  console.log("Selected movie:", movie);

  if (!movie) {
    return <div>Loading movie data...</div>; // Show a loading message or a fallback UI
  }

  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImageUrl} alt={movie.Title} />
      </div>
      <div className="movie-details">
        <div className="movie-title">
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span>Genres: </span>
          <span>{movie.Genre.map(g => g.Name).join(', ')}</span>
        </div>
        <div className="movie-director">
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    </div>
  );
};