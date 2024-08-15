import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://crazi-movies-5042ca35c2c0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((e) => console.log(e));
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
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
          <Col md={7}>
            or
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <>
          <Col md={8}>
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
              variant="secondary"
            >
              Logout
            </Button>
          </Col>
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </>
      ) : movies.length === 0 ? (
        <Col>
          <div>The list is empty!</div>
        </Col>
      ) : (
        <>
          {movies.map((movie) => (
            <Col md={3} className="mb-3" key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
