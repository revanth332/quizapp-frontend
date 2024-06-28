import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,Outlet} from 'react-router-dom';
import './AppNavbar.css';
const logo = require('../Images/quizlogo2.png')


function AppNavbar({logged=false}) {
  return (
    <>
      <Navbar style={{width:'100%'}} sticky='top' bg="light" variant="dark">
        <Container>
          <Navbar.Brand ><img src={logo} height={60}/></Navbar.Brand>
          {!logged ? <Nav>
            <Link style={{textDecoration:"none"}} to="/"><span className='fs-lg-5 me-3' style={{color:"black"}}>Home</span></Link>
            <Link style={{textDecoration:"none"}} to="/signup"><span className='fs-lg-5 me-3' style={{color:"black"}}>Sign Up</span></Link>
            <Link style={{textDecoration:"none"}} to="/makequiz"><span className='fs-lg-5 ' style={{color:"black"}}>Sign In</span></Link>
          </Nav> : <Nav>
            <Link style={{textDecoration:"none",color:"rgb(103, 58, 183)"}} to="/dashboard"><span className='navb-link' style={{marginLeft:10,fontWeight:"bold"}}>Dashboard</span></Link>
            <Link style={{textDecoration:"none",color:"rgb(103, 58, 183)"}} to="/makequiz"><span className='navb-link' style={{marginLeft:10,fontWeight:"bold"}}>Makequiz</span></Link>  
          </Nav>}
          
        </Container>
      </Navbar>
      <br/>
    </>
  );
}

export default AppNavbar;
