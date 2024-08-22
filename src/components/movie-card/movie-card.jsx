import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, onFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.Favorites) {
      setIsFavorite(user.Favorites.includes(movie.Id));
    }
  }, [user, movie.Id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevents the link click event from navigating
  
    if (!user || !user.Username) {
      console.error("User is undefined or missing Username.");
      return;
    }
  
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}/movies/${movie.Id}`;
  
    fetch(url, {
      method: method,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        if (response.ok) {
          setIsFavorite(!isFavorite);
        } else {
          console.error("Failed to update favorite status.");
        }
      })
      .catch(error => {
        console.error("Error updating favorite status:", error);
      });
  };

  return (
    <Card as={Link} to={`/movies/${encodeURIComponent(movie.Id)}`} className="text-decoration-none">
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button 
          variant={isFavorite ? "danger" : "outline-primary"} 
          onClick={toggleFavorite}
        >
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
    Username: PropTypes.string.isRequired,
    Favorites: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onFavorite: PropTypes.func.isRequired,
};