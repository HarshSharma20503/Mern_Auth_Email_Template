import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = async () => {
    localStorage.removeItem("user");

    try {
      const response = await axios.get("/api/auth/logout");
      console.log(response);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }

    navigate("/login");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("user")]);

  return (
    <>
      <Navbar key="md" expand="md" className="bg-body-danger" bg="info">
        <Container fluid>
          <Navbar.Brand href="/">Project Name</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton className="bg-info">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>Project Name</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-info">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {user ? (
                  <>
                    <Nav.Link as={Link} to="/">
                      Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/signUp">
                      Sign Up
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
