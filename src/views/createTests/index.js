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
      themes: [],
      questions: [],

      idTests: null,

      status: true
    };

    this.setNameTest = this.setNameTest.bind(this);
    this.createTest = this.createTest.bind(this);
    this.createPassword = this.createPassword.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setTimeAll = this.setTimeAll.bind(this);
    this.onChangeThema = this.onChangeThema.bind(this);
    this.setTestType = this.setTestType.bind(this);
    this.setIdCountBalls = this.setIdCountBalls.bind(this);
    this.setIdCountQuestions = this.setIdCountQuestions.bind(this);
    this.setIdActivity = this.setIdActivity.bind(this);
    this.saveAll = this.saveAll.bind(this);
  }

  componentDidMount(){
    getData("CreateTest/GetAllTest").then(body=>{
      const json = JSON.parse(body);
      console.log('all tests', json);
      this.setState({
        tests: json
      });
    });

    getData("CreateTest/GetAllThemes").then(body=>{
      const json = JSON.parse(body);
      console.log('all themes', json);
      this.setState({
        themes:json
      });
    });
  }

  setIdTest(id){
    this.setState({ idTests: id });
  }

  setNameTest(event){
    if(this.state.idTests === null){
      return null;
    }
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        tests[i].name = event.target.value;
        this.setState({ tests: tests });
      }
    }
  }

  setDescription(event){// description
    if(this.state.idTests === null){
      return null;
    }
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        tests[i].description = event.target.value;
        this.setState({ tests: tests });
      }
    }
  }
  // setTimeAll setTestType OnChangeTypeChecking

  setTimeAll(event){// description
    if(this.state.idTests === null){
      return null;
    }
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        tests[i].timeAll = event.target.value;
        this.setState({ tests: tests });
      }
    }
  }

  setTestType(event){// description
    if(this.state.idTests === null){
      return null;
    }
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        // var tests = this.state.tests;
        // tests[i].timeAll = event.target.value;
        // this.setState({ tests: tests });
      }
    }
  }

  createTest(){
    var tests = this.state.tests;
    tests.push({
      description: "",
      id: uuidv4(),
      marks:[],
      name: "New thema " + tests.length,
      passwords: [],
      testType: [],
      timeAll: 0,
    });
    this.setState({tests: tests});
  }

  saveAll(){

  }

  createPassword(){
    if(this.state.idTests === null){
      return null;
    }
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        const uuid = uuidv4();
        const newPassword = uuid.split('-')[0] + '-'+ uuid.split('-')[1];
        tests[i].passwords.push(newPassword);
        console.log('passwords', newPassword);
      }
    }
    this.setState({tests: tests});
  }

  setIdCountBalls(event){
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        var idThemaNow = event.target.attributes.getNamedItem('key-date').value;
        for(var a = 0;a<tests[i].themes.length;a++){
          if(tests[i].themes[a].themaId === idThemaNow){
            console.log('test right', tests[i].themes[a]);// countBalls countQuest
            tests[i].themes[a].countBalls = event.target.value;
          }
        }
      }
    }
    this.setState({tests: tests});
  }

  setIdCountQuestions(event){
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        var idThemaNow = event.target.attributes.getNamedItem('key-date').value;
        for(var a = 0;a<tests[i].themes.length;a++){
          if(tests[i].themes[a].themaId === idThemaNow){
            console.log('test right', tests[i].themes[a]);// countBalls countQuest
            tests[i].themes[a].countQuest = event.target.value;
          }
        }
      }
    }
    this.setState({tests: tests});
  }

  setIdActivity(event){
    var status = false;
    for(var i=0;i<this.state.tests.length; i++){
      if(this.state.tests[i].id === this.state.idTests){
        var tests = this.state.tests;
        var idThemaNow = event.target.attributes.getNamedItem('key-date').value;
        for(var a = 0;a<tests[i].themes.length;a++){
          if(tests[i].themes[a].themaId === idThemaNow){
            console.log('test right', tests[i].themes[a]);
            status = true;
            tests[i].themes.splice(a, 1);
          }
        }
        if(!status){
          var thema = null;
          for(var l = 0;l<this.state.themes.length;l++){
            if(this.state.themes[l].id === idThemaNow){
              thema = this.state.themes[l];
            }
          }
          tests[i].themes.push({
            countBalls: 0,
            countQuest: 0,
            id: uuidv4(),
            thema: 0,
            themaId: idThemaNow
          });
        }
      }
    }
    this.setState({tests: tests});
  }

  onChangeThema(){

  }

  OnChangeTypeChecking(eventKey, event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idTests){
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
    var passwordsView = [];
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
      testsView.push(<ListGroup.Item key={'test-' + i} onClick={this.setIdTest.bind(this, this.state.tests[i].id)} key={i.toString()} on as="li" active={act}>{this.state.tests[i].name}</ListGroup.Item>);
    }

    if(passwords!==null){
      for(var i=0;i<passwords.length;i++){
        passwordsView.push(<InputGroup.Text  key={'password-' + i} id="inputGroup-sizing-sm">{passwords[i]}</InputGroup.Text>);
      }
    }

    for(var i = 0; i < this.state.themes.length; i++){
      var status = false;
      var countBalls = 0;
      var countQuestions = 0;
      var themesId = this.state.themes[i].id;
      if(themes!==null){
        for(var a = 0; a < themes.length;a++){
          if(themes[a].themaId === this.state.themes[i].id){
            countQuestions = themes[a].countQuest;
            countBalls = themes[a].countBalls;
            status = true;
            console.log('test', themes[a]);
          }
        }
      }
      themesView.push((<tr key={"table-"+i}>
        <td>{i+1}</td>
        <td><input key-date={themesId} type="checkbox" defaultChecked={status} onClick={this.setIdActivity}/></td>
        <td><input key-date={themesId} type="number" name="countQuestions" value={countQuestions} disabled={!status} onChange={this.setIdCountQuestions}/></td>
        <td><span>{this.state.themes[i].questions.length}</span></td>
        <td><input key-date={themesId} type="number" name="count balls" value={countBalls} disabled={!status} onChange={this.setIdCountBalls}/></td>
        <td><p title={this.state.themes[i].description}>{this.state.themes[i].name}</p></td>
      </tr>));
    }
    
    return (
      <div style={{display: "flex", marginTop:'1%', paddingRight:'1%'}}>
      <ListGroup as="ul" className="themes">
        <h1>Tests</h1>
        <Button variant="outline-secondary" style={{marginBottom:'5px'}} onClick={this.createTest}>Create Thema</Button>
        {testsView}
      </ListGroup>
      {this.state.idTests && 
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
            {passwordsView}
            <Button onClick={this.createPassword}> New password </Button>
          </InputGroup>
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item> Action </Dropdown.Item>
            <Dropdown.Item> Another action </Dropdown.Item>
            <Dropdown.Item> Something else </Dropdown.Item>
          </DropdownButton>
          <div style={{display:'flex', width:'100%'}}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th style={{width:'16%'}}>Activity thema</th>
                <th style={{width:'16%'}}>Number of questions</th>
                <th style={{width:'16%'}}>Number of quest all</th>
                <th style={{width:'16%'}}>Number of balls</th>
                <th style={{width:'34%'}}>Name of thema</th>
              </tr>
            </thead>
            <tbody>
              {themesView}
            </tbody>
          </Table>
          </div>
          <div>
          </div>
          <Button variant="success" style={{marginBottom:'5px'}} onClick={this.saveAll}>Save all tests</Button>
        </div>
      }
      
      
      </div>
    )
  }
}
