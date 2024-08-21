import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, onFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.Favorites) {
      setIsFavorite(user.Favorites.includes(movie.Id));
    }
  }, [user, movie.Id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevents the click event from navigating to the movie details
    setIsFavorite(prevState => !prevState);
    onFavorite(movie.Id);
  };

  return (
    <Card as={Link} to={`/movies/${encodeURIComponent(movie.Id)}`} className="text-decoration-none">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button variant={isFavorite ? "danger" : "outline-primary"} onClick={toggleFavorite}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
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
  user: PropTypes.shape({
    Favorites: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  onFavorite: PropTypes.func.isRequired,
};