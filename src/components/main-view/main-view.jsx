import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    // Initialize user with default values
    const [user, setUser] = useState({
        Username: "",
        Email: "",
        Favorites: [] // Ensure this is an array
    });
    const [movies, setMovies] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {
            Username: "",
            Email: "",
            Favorites: [] // Ensure this is an array
        };
        const storedToken = localStorage.getItem("token");
        setUser(storedUser);
        setToken(storedToken);
    }, []);

    useEffect(() => {
        if (!token) return;

        fetch("https://crazi-movies-5042ca35c2c0.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((movies) => {
            const moviesApi = movies.map((movie) => ({
                Id: movie._id,
                Title: movie.Title,
                Description: movie.Description,
                ImageUrl: movie.ImageUrl,
                Genre: movie.Genre,
                Director: movie.Director
            }));
            setMovies(moviesApi);
        })
        .catch((e) => console.log(e));
    }, [token]);

    const handleLoggedOut = () => {
        setUser({
            Username: "",
            Email: "",
            Favorites: [] // Reset to default values
        });
        setToken(null);
        localStorage.clear();
    };

    const toggleFavorite = (movieId) => {
        if (!user || !user.Favorites) return;

        const updatedFavorites = user.Favorites.includes(movieId)
            ? user.Favorites.filter(id => id !== movieId)
            : [...user.Favorites, movieId];
    
        fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: updatedFavorites.includes(movieId) ? 'POST' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(updatedUser => {
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        })
        .catch(e => console.error("Error updating favorites:", e));
    };

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            user.Username ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={7}>
                                    <SignupView />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            user.Username ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={7}>
                                    <LoginView
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                            localStorage.setItem("user", JSON.stringify(user));
                                            localStorage.setItem("token", token);
                                        }}
                                    />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/movies/:MovieID"
                        element={
                            !user.Username ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} user={user} token={token} setUser={setUser} />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            !user.Username ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col
                                            md={3}
                                            className="mb-4"
                                            key={movie.Id}
                                        >
                                            <MovieCard movie={movie} user={user} onFavorite={() => toggleFavorite(movie.Id)} />
                                        </Col>
                                    ))}
                                </>
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            !user.Username ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col md={8}>
                                    <ProfileView 
                                        user={user}
                                        token={token}
                                        onUpdateUser={(updatedUser) => {
                                            console.log("Update user", updatedUser);
                                            setUser(updatedUser);
                                            localStorage.setItem("user", JSON.stringify(updatedUser));
                                        }}
                                        onDeregister={() => {
                                            console.log("Deregister user", user.Username);
                                            setUser({
                                                Username: "",
                                                Email: "",
                                                Favorites: [] // Reset to default values
                                            });
                                            setToken(null);
                                            localStorage.clear();
                                        }}
                                        toggleFavorite={toggleFavorite} 
                                    />
                                </Col>
                            )
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};