import { Navbar, Nav, Container} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';


const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand='md' collapseOnSelect>
            <Container>
                <Navbar.Brand href='/'>Test-shop</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='baisc-navbar-nav'/>
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'><FaShoppingCart /> Carrinho</Nav.Link>
                        <Nav.Link href='/login'><FaUser /> Entrar</Nav.Link> 
                    </Nav>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header