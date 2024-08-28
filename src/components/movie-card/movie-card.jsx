import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card as={Link} to={`/movies/${encodeURIComponent(movie.Id)}`} className="text-decoration-none">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
};