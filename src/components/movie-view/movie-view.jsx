import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import './movie-view.scss';

export const MovieView = ({ movies, user = {}, token, setUser }) => {
    const { MovieID } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

    const movie = movies.find((m) => m.Id === MovieID);

    useEffect(() => {
        if (user.Favorites) {
            setIsFavorite(user.Favorites.includes(MovieID));
        }
    }, [MovieID, user]);

    const updateFavorite = (method) => {
        if (!user.Username) {
            console.error("User is undefined or missing Username.");
            return;
        }

        console.log(`Attempting to ${method === "POST" ? "add" : "remove"} favorite: ${MovieID}`);

        fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}/movies/${MovieID}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update favorites');
            }
        })
        .then((data) => {
            console.log("Favorite updated successfully:", data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setIsFavorite(method === "POST");
        })
        .catch((error) => {
            console.error("Error updating favorite status:", error);
        });
    };

    if (!movie) return <div>Loading movie data...</div>;

    return (
        <Card className="h-100 w-100 movie-view">
            <div className="movie-poster">
                <Card.Img variant="top" src={movie.ImageUrl} />
            </div>
            <Card.Body>
                <Card.Header className="text-center fs-1">{movie.Title}</Card.Header>
                <Card.Text><strong>Director:</strong> {movie.Director.Name}</Card.Text>
                <Card.Text><strong>Genre:</strong> {movie.Genre.map(g => g.Name).join(', ')}</Card.Text>
                <Card.Text><strong>Description:</strong> {movie.Description}</Card.Text>
                <Button
                    variant={isFavorite ? "danger" : "primary"}
                    onClick={() => updateFavorite(isFavorite ? "DELETE" : "POST")}
                    className="mt-2"
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                <Link to={`/`}>
                    <Button variant="secondary" className="mt-2">Back</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};