import React from 'react';
import './../../App.css';
import {Modal, Button, Form,Dropdown,DropdownButton,FormControl,InputGroup,Table, ListGroup} from 'react-bootstrap';
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

      status: true
    };
    this.setNameTest = this.setNameTest.bind(this);
    this.createTest = this.createTest.bind(this);
    this.setCountBalls = this.setCountBalls.bind(this);
    this.setCountQuestions = this.setCountQuestions.bind(this);
    this.setPassword = this.setPassword.bind(this);
    // setDescription setTimeAll onChangeThema OnChangeTypeChecking
  }

  componentDidMount(){
    getData("CreateTest/GetAllTest").then(body=>{
      const json = JSON.parse(body);
      console.log('tests', json);
      this.setState({
        tests: json,
        idThemes: json[0].id
      });
    });
  }

  setIdTest(id){
    this.setState({ idTests: id });
  }

  setNameTest(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     themes[i].name = event.target.value;
    //     this.setState({ themes: themes });
    //   }
    // }
  }

  createTest(){
    // var themes = this.state.themes;
    // themes.push({
    //   name: "Themes",
    //   questions: [],
    //   id: uuidv4()
    // });
    // this.setState({ themes: themes });
  }

  setCountBalls(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     for(var a =0;a<themes[i].questions.length;a++){
    //       if(this.state.idQuestion === themes[i].questions[a].id){
    //         themes[i].questions[i].name = event.target.value;
    //       }
    //     }
    //     this.setState({themes: themes});
    //   }
    // }
  }

  setCountQuestions(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     for(var a =0;a<themes[i].questions.length;a++){
    //       if(this.state.idQuestion === themes[i].questions[a].id){
    //         themes[i].questions[i].name = event.target.value;
    //       }
    //     }
    //     this.setState({themes: themes});
    //   }
    // }
  }

  setPassword(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     for(var a =0;a<themes[i].questions.length;a++){
    //       if(this.state.idQuestion === themes[i].questions[a].id){
    //         themes[i].questions[i].name = event.target.value;
    //       }
    //     }
    //     this.setState({themes: themes});
    //   }
    // }
  }

  setDescription(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     for(var a =0;a<themes[i].questions.length;a++){
    //       if(this.state.idQuestion === themes[i].questions[a].id){
    //         themes[i].questions[i].name = event.target.value;
    //       }
    //     }
    //     this.setState({themes: themes});
    //   }
    // }
  }

  setTimeAll(event){
    // for(var i=0;i<this.state.themes.length; i++){
    //   if(this.state.themes[i].id === this.state.idThema){
    //     var themes = this.state.themes;
    //     for(var a =0;a<themes[i].questions.length;a++){
    //       if(this.state.idQuestion === themes[i].questions[a].id){
    //         themes[i].questions[i].name = event.target.value;
    //       }
    //     }
    //     this.setState({themes: themes});
    //   }
    // }
  }

  onChangeThema(){

  }

  OnChangeTypeChecking(eventKey, event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          if(this.state.idQuestion === themes[i].questions[a].id){
              themes[i].questions[a].typeAnswer = event.target.value;
          }
        }
        this.setState({themes: themes});
      }
    }
  }

  componentWillReceiveProps(){

  }

  render(){
    // Views
    var testsView = [];
    var themesView = [];
    // list
    var themes = null;
    var nameTest = null;
    var descriptionTest = null;
    var timeAll = null;
    var passwords = null;
    var dateUpdated = null;

    for(var i = 0; i < this.state.tests.length; i++){
      var act = false;
      if(this.state.tests[i].id === this.state.idTests){
        act = true;
        nameTest = this.state.tests[i].name;
        descriptionTest = this.state.tests[i].description;
        themes = this.state.tests[i].themes;
        passwords = this.state.tests[i].passwords;
        timeAll = this.state.tests[i].timeAll;
        dateUpdated = this.state.tests[i].dateLastChanges;
      }
      testsView.push(<ListGroup.Item onClick={this.setIdTest.bind(this, this.state.tests[i].id)} key={i.toString()} on as="li" active={act}>{this.state.tests[i].name}</ListGroup.Item>);
    }

    
    return (
      <div style={{display: "flex", marginTop:'1%', paddingRight:'1%'}}>
      <ListGroup as="ul" className="themes">
        <h1>Tests</h1>
        <Button variant="outline-secondary" style={{marginBottom:'5px'}} onClick={this.createThema}>Create Thema</Button>
        {testsView}
      </ListGroup>
      <div style={{alignSelf:'middle', justifyContent:'center', width:'80%', marginLeft:'4%'}}>
      <InputGroup size="sm" className="mb-3" >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Name Thema</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={this.setNameTest}  aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={nameTest}/>
      </InputGroup>
      <InputGroup.Text style={{alignSelf:'center'}}>Description</InputGroup.Text>
      <InputGroup style={{width:'100%'}}>
        <FormControl onChange={this.setDescription} as="textarea" aria-label="With textarea" value={descriptionTest}/>
      </InputGroup>
      <InputGroup size="sm" className="mb-3" >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Time all</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={this.setTimeAll}  aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={timeAll}/>
      </InputGroup>
      <InputGroup size="sm" className="mb-3" >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Passwords</InputGroup.Text>
        </InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Password-1</InputGroup.Text>
        <InputGroup.Text id="inputGroup-sizing-sm">Password-2</InputGroup.Text>
        <InputGroup.Text id="inputGroup-sizing-sm">Password-3</InputGroup.Text>
        <Button value="">new password</Button>
      </InputGroup>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <div style={{display:'flex', width:'100%'}}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th style={{width:'16%'}}>Activity thema</th>
            <th style={{width:'16%'}}>Number of questions</th>
            <th style={{width:'16%'}}>Number of balls</th>
            <th style={{width:'50%'}}>Name of thema</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><input type="checkbox" checked={true} /></td>
            <td><input type="number" name="countQuestions" value={2} /></td>
            <td><input type="number" name="count balls" value={2} /></td>
            <td>Name thema</td>
          </tr>
        </tbody>
      </Table>
      {/* <ListGroup variant="flush" style={{width:'100%'}}>
        <ListGroup.Item>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
          </InputGroup.Prepend>
          <FormControl aria-label="Text input with checkbox" value="3" style={{width:'5%'}}/>
          Dapibus ac facilisis in
          <FormControl aria-label="Text input with checkbox" value="3" style={{width:'5%'}}/>
        </InputGroup>
      </ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup> */}
      </div>
      <div>

      </div>
      <Button variant="success" style={{marginBottom:'5px'}} onClick={this.createThema}>Save all tests</Button>
      </div>
      
      </div>
    )
  }
}
