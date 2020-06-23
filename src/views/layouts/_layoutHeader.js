import React from 'react';
// import logo from './../../logo.svg';
import './../../css/layouts/_layoutHeader.css';
import {Modal, Button, Form,Navbar,Nav,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      isAuthorization: true,

      login: "login",
      password: "password",
      visible: false,
    };
    this.visibleFalse = this.setVisible.bind(this, false);
    this.visibleTrue = this.setVisible.bind(this, true);
    this.authorization = this.authorization.bind();
  }
  componentDidMount(){

  }

  componentWillReceiveProps(){

  }

  authorization(){
    const username = this.state.username;
    const password = this.state.password;

    console.debug('authorization,', username, password)
  }

  setVisible(isVisible){
    console.debug('qwe', isVisible);
    this.setState({visible: isVisible});
  }


  render(){
    return (
      <Navbar bg="light" expand="lg" style={{paddingLeft:'80px'}}>
      <Navbar.Brand href="/">Training</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Articles">Articles</Nav.Link>
          <Nav.Link href="/VideoCalls">Video calls</Nav.Link>
          <Nav.Link href="/Testing">Tests</Nav.Link>
          <Nav.Link href="/Meeting">Meeting</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
          {!this.state.isAuthorization && 
          <>
          <Button variant="outline-secondary" onClick={this.visibleTrue}>Log in</Button>
          <Modal show={this.state.visible} onHide={this.visibleFalse}>
        <Modal.Header closeButton>
            <Modal.Title>Authorization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  {(() => {
                    if (this.state.error!=null) {
                    return ( <h4>{this.state.error}</h4>);
                        } 
                    })()
                    }
       
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Логин:</Form.Label>
                    <Form.Control onChange={(e) => this.setState({login:e})} defaultValue={this.state.login} type="text" placeholder="login" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control onChange={(e) => this.setState({password:e})} defaultValue={this.state.password} type="password" placeholder="password" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-secondary" onClick={this.authorization}>
             Регистрация
            </Button>
            <Button variant="outline-secondary" onClick={this.authorization}>
                Вход
            </Button>
        </Modal.Footer>
    </Modal>
    </>
          }
          {this.state.isAuthorization && 
      <NavDropdown title={this.state.login} variant="outline-secondary" id="collasible-nav-dropdown" style={{paddingRight:'80px'}}>
        <NavDropdown.Item href="/Themes">Create themes</NavDropdown.Item>
        <NavDropdown.Item href="/Tests">Create tests</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/Home/Logout">Logout</NavDropdown.Item>
    </NavDropdown>}
        </Form>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

