import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://crazi-movies-5042ca35c2c0.herokuapp.com/users/${user.Username}`)
      .then(response => response.json())
      .then(data => {
        setFavoriteMovies(movies.filter(m => user.Favorites.includes(m.Id)));
      })
      .catch(e => console.error(e));
  }, [user, movies]);

  const handleUpdate = () => {
    // Call your update API with the new user details
    onUpdateUser({ Username: username, Password: password, Email: email, Birthday: birthdate });
  };

  const handleDeregister = () => {
    onDeregister(user.Username);
    navigate('/login');
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label>Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Birthdate: </label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDeregister}>Deregister</button>

      <h3>Favorite Movies</h3>
      <div>
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies.</p>
        ) : (
          favoriteMovies.map(movie => (
            <MovieCard key={movie.Id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};