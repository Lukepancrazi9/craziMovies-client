import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    onLoggedOut();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Crazi Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {/* Additional Nav Links can be uncommented as needed */}
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};