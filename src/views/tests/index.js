import React from 'react';
import './../../App.css';
import {Modal, Button, Form,Dropdown,DropdownButton,FormControl,InputGroup,Table, ListGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.css';
import {getData} from './../../helpers/Requests';
import { v4 as uuidv4 } from 'uuid';


var types = ["Один правильный", "Несколько правильных"];
export default class CreateTest extends React.Component {

  constructor(props){
    super(props);
    this.state={
      tests: [],
      questions: [],
      idTests: null,
      status: true,
      password: "",
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.checkingPassword = this.checkingPassword.bind(this);
  }

  componentDidMount(){// TestingTest/GetTests
    getData("TestingTest/GetAllTest").then(body=>{
      const json = JSON.parse(body);
      console.log('all tests', json);
      this.setState({
        tests: json
      });
    });
  }

  onChangePassword(event){
    this.setState({
      password: event.target.value
    });
  }

  checkingPassword(){

  }
  componentWillReceiveProps(){

  }

  selectTest(id){
    console.log('Select id =', id);
  }

  render(){
    // Views
    var testsView = [];

    for(var i=0; i < this.state.tests.length; i++){
      console.log(this.state.tests[i]);
      testsView.push(
      <OverlayTrigger key={'test-' + i} overlay={<Tooltip id="tooltip-disabled">{this.state.tests[i].description}</Tooltip>}>
          <span className="d-inline-block">
          <ListGroup.Item style={{ pointerEvents: 'none', width: '100%' }} 
              onClick={this.selectTest.bind(this, this.state.tests[i].id)} as="li">{this.state.tests[i].name} ({this.state.tests[i].questions.length})</ListGroup.Item>
          </span>
        </OverlayTrigger>
      );
    }

    return (
      <div style={{display: "flex", marginTop:'1%', paddingRight:'1%'}} >
      <ListGroup as="ul" className="themes">
        <h1 style={{width:'100%',textAlign:'center'}}>Tests</h1>
        {testsView}
      </ListGroup>
      <div style={{width:'100%', height:'30%', position:'relative'}}>
        <h1 style={{width:'100%',textAlign:'center', height:'50%',}}>Password</h1>
        <div style={{display: 'flex', marginTop: '1%', paddingRight: '1%', position: 'absolute', left:'25%'}} >
          <FormControl onChange={this.setNameTest} style={{width:'250px', }} onChange={this.onChangePassword}
                aria-label="lg" aria-describedby="inputGroup-sizing-sm" placeholder={"Password"} value={this.state.password}/>
          <Button variant="success" style={{marginBottom:'5px'}} onClick={this.checkingPassword}>Check passwords</Button>
        </div>
      </div>
      </div>
    )
  }
}
