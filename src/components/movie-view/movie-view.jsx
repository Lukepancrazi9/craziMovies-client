import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { MovieID } = useParams();

  console.log("MovieId from URL:", MovieID);
  console.log("Movies array:", movies);

  // Find the movie based on MovieId
  const movie = movies.find((m) => m.Id === MovieID);

  // Log the found movie
  console.log("Selected movie:", movie);

    return (
      <div>
        <div>
          <img src={movie.ImageUrl} alt={movie.Title} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genres: </span>
          <span>{movie.Genre.map(g => g.Name).join(', ')}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Link to={`/`}>
        <button className="back-button">Back</button>
        </Link>
      </div>
    );
  };