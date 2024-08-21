import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, onFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(user.Favorites.includes(movie.Id));

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(movie.Id);
  };

  return (
    <Card>
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button onClick={toggleFavorite}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
};