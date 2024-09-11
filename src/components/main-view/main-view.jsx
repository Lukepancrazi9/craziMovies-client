import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Favorites: []
  });
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);
  const [filterMovies, setFilterMovies] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      Username: "",
      Email: "",
      Favorites: []
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

  // Filter movies based on the search input
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filterMovies.toLowerCase())
  );

  const handleLoggedOut = () => {
    setUser({
      Username: "",
      Email: "",
      Favorites: []
    });
    setToken(null);
    localStorage.clear();
  };

  const toggleFavorite = (movieId) => {
    if (!user || !user.Favorites) return;

    const updatedFavorites = user.Favorites.includes(movieId)
      ? user.Favorites.filter((id) => id !== movieId)
      : [...user.Favorites, movieId];

    fetch(
      `https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: updatedFavorites.includes(movieId) ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((e) => console.error("Error updating favorites:", e));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        filterMovies={filterMovies}
        setFilterMovies={setFilterMovies}
        onLoggedOut={handleLoggedOut}
      />
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
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
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
                  {/* Search Bar only on the Home Page */}
                  <Form className="d-flex justify-content-center mb-4">
                    <Form.Control
                      type="search"
                      placeholder="Search for a movie"
                      value={filterMovies}
                      onChange={(e) => setFilterMovies(e.target.value)}
                      aria-label="Search"
                      className="me-3"
                      style={{ maxWidth: "300px" }}
                    />
                  </Form>

                  {filteredMovies.length === 0 ? (
                    <Col>No Movies Found</Col>
                  ) : (
                    filteredMovies.map((movie) => (
                      <Col md={3} className="mb-4" key={movie.Id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          onFavorite={() => toggleFavorite(movie.Id)}
                        />
                      </Col>
                    ))
                  )}
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
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                    }}
                    onDeregister={() => {
                      setUser({
                        Username: "",
                        Email: "",
                        Favorites: []
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