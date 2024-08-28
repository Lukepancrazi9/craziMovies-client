import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { UserInfo } from './user-info';
import { ProfileUpdate } from './profile-update';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ user, token, onUpdateUser, onDeregister, toggleFavorite }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [error, setError] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        if (!user?.Username || !token) return;

        // Fetch user data
        fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(userData => {
            console.log("User Data:", userData); // Debug user data
            const favoriteIds = userData.Favorites;
            console.log("Favorite IDs:", favoriteIds); // Debug favorite IDs

            // Fetch all movies
            fetch('https://crazi-movies-5042ca35c2c0.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => response.json())
            .then(movies => {
                console.log("Movies Data:", movies); // Debug movie data
                const favoriteMoviesList = movies.filter(movie => favoriteIds.includes(movie._id));
                console.log("Favorite Movies List:", favoriteMoviesList); // Debug filtered movies
                setFavoriteMovies(favoriteMoviesList);
            })
            .catch(e => {
                console.error("Error fetching movies:", e);
                setError("Failed to load favorite movies.");
            });
        })
        .catch(e => {
            console.error("Error fetching user data:", e);
            setError("Failed to load user data.");
        });
    }, [user.Username, token]);

    const handleRemoveFavorite = (movieId) => {
        fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
                toggleFavorite(movieId); // Optionally update the favorite state in MainView
            } else {
                alert("Failed to remove favorite movie!");
            }
        })
        .catch(e => {
            console.error("Error removing favorite movie:", e);
        });
    };

    const handleProfileUpdate = (updatedUser) => {
        fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Return the updated user data and new token
            } else {
                throw new Error('Failed to update profile.');
            }
        })
        .then(({ user: updatedUserData, token: newToken }) => {
            onUpdateUser(updatedUserData); // Update user state with the new data
            localStorage.setItem('token', newToken); // Update the stored token
            alert('Profile updated successfully. Please log in with your new username.');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        });
    };

    const handleAccountDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Account deleted successfully!");
                    onDeregister(user.Username);
                } else {
                    alert("Failed to delete account!");
                }
            })
            .catch(e => {
                console.error("Error deleting account:", e);
            });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <UserInfo username={user.Username} email={user.Email} />
                        </Card.Header>
                    </Card>
                </Col>
                <Col md={8} className="mt-4">
                    <Card>
                        <Card.Body>
                            <h3>Favorite Movies</h3>
                            {error && <p>{error}</p>}
                            {favoriteMovies.length > 0 ? (
                                <FavoriteMovies favMovies={favoriteMovies} onRemoveFavorite={handleRemoveFavorite} />
                            ) : (
                                <p>No favorite movies found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} className="mt-4">
                    <Card>
                        <Card.Body>
                            {showUpdateForm ? (
                                <ProfileUpdate
                                    user={user}
                                    onUpdate={handleProfileUpdate}
                                />
                            ) : (
                                <Button 
                                    variant="primary"
                                    onClick={() => setShowUpdateForm(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </Card.Body>
                        <Card.Body>
                            <Button 
                                variant="danger"
                                onClick={handleAccountDelete}
                            >
                                Delete Account
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};