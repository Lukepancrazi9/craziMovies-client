import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Ensure token is properly retrieved

  useEffect(() => {
    if (!user.Username || !token) return;

    fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => {
        setFavoriteMovies(movies.filter(m => data.Favorites.includes(m.Id)));
      })
      .catch(e => {
        console.error("Error fetching user data:", e);
        setError("Failed to load favorite movies.");
      });
  }, [user.Username, token, movies]);

  const handleUpdate = () => {
    onUpdateUser({ Username: username, Password: password, Email: email, Birthday: birthdate });
  };

  const handleDeregister = () => {
    onDeregister(user.Username);
    navigate('/login');
  };

  return (
    <Container className="my-4">
      <h2>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
            <Button variant="danger" onClick={handleDeregister} className="ms-2">Deregister</Button>
          </Form>
        </Col>
      </Row>
  
      <h3>Favorite Movies</h3>
      <Row>
        {favoriteMovies.length === 0 ? (
          <Col>No favorite movies.</Col>
        ) : (
          favoriteMovies.map(movie => (
            <Col md={3} className="mb-4" key={movie.Id}>
              <MovieCard movie={movie} user={user} onFavorite={() => {}} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};