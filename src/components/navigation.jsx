
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {Fragment} from 'react';
function Navigation({user}) {
    return (
   <Navbar bg="light" expand="lg">
      <Container>
      <Fragment>
        
        <Nav.Link href="/">Home</Nav.Link>
        
        </Fragment>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="me-auto">
       
     
     {!user&&<Fragment>
            <Nav.Link href="/login">Login</Nav.Link>

            <Nav.Link href='/register'>Register</Nav.Link>
          </Fragment>}

          
        {user&&
          <Fragment>
            {user.name}
            <Nav.Link href='/logout'>Logout</Nav.Link>
          </Fragment>}
          
        {user&&<NavDropdown title="database" id="basic-nav-dropdown">
          {(user&&(user.authorization =='user')) && 
            <Fragment>
              <NavDropdown.Item href="profile">Pofile</NavDropdown.Item>

              <NavDropdown.Item href="usersstore">My Store</NavDropdown.Item>

            </Fragment>}
              {(user&&(user.authorization =='admin')) &&<Fragment>
                <NavDropdown.Item href="brands">Brands</NavDropdown.Item>
                      <NavDropdown.Divider/>
                      <NavDropdown.Item href="products">products</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2"></NavDropdown.Item>
                
                  <NavDropdown.Item href="/"></NavDropdown.Item>
                  <NavDropdown.Divider />
      
                  <NavDropdown.Item href="categories"></NavDropdown.Item>
                  <NavDropdown.Item href="categories">categories</NavDropdown.Item>
                <NavDropdown.Item href="/"></NavDropdown.Item>
                <NavDropdown.Divider />
      
                    <NavDropdown.Item href="origins">Origin</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                  
      
                    <NavDropdown.Item href="units">Units</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
      
                    </NavDropdown.Item>
                    </Fragment>}
            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;


       