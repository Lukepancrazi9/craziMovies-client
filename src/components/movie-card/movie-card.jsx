import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
      <Card onClick={() => onMovieClick(movie)} variant="link">
        <Card.Img variant="top" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>
      </Card>
    );
  };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};