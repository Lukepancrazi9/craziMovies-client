import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favMovies, onRemoveFavorite }) => (
    <div>
        {favMovies.length > 0 ? (
            favMovies.map(movie => (
                <Card key={movie._id} className="mb-3">
                    <Card.Body>
                        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                            <Card.Img 
                                variant="top" 
                                src={movie.ImageUrl} 
                                style={{ maxWidth: '150px', maxHeight: '225px', objectFit: 'cover' }}
                                alt={movie.Title} 
                            />
                        </Link>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Button
                            variant="danger"
                            onClick={() => onRemoveFavorite(movie._id)}
                            className="ms-2"
                        >
                            Remove from Favorites
                        </Button>
                    </Card.Body>
                </Card>
            ))
        ) : (
            <p>No favorite movies found.</p>
        )}
    </div>
);

FavoriteMovies.propTypes = {
    favMovies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    onRemoveFavorite: PropTypes.func.isRequired
};