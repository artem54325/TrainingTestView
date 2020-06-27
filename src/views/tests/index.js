import React from 'react';
import './../../App.css';
import {Button,FormControl, ListGroup, OverlayTrigger, Tooltip, Form, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.css';
import {getData, postData, postDataJson} from './../../helpers/Requests';
// import { v4 as uuidv4 } from 'uuid';


export default class CreateTest extends React.Component {

  constructor(props){
    super(props);
    this.state={
      tests: [],
      questions: [],
      questionsResult: [],
      result: null,
      selectQuest: 0,
      idTests: null,
      password: "",
      startDate:null,
      status: "select",// select, write, result
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.checkingPassword = this.checkingPassword.bind(this);
    this.selectTest = this.selectTest.bind(this);

    this.onResult = this.onResult.bind(this);
    this.selectAnser = this.selectAnser.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onQuestion = this.onQuestion.bind(this);
    this.onQuestionResult = this.onQuestionResult.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount(){// TestingTest/GetTests
    // getData("TestingTest/GetAllTest").then(body=>{
    //   const json = JSON.parse(body);
    //   console.log('all tests', json);
    //   this.setState({
    //     tests: json,
    //     status: "select",
    //   });
    // });
    postData("TestingTest/GetTest", { id: "test-1" }).then((body) => {
      console.log('body ', body);
      for(var i = 0; i < body.length; i++){
        body[i].rightAnswers = [];
      }
      this.setState({
        questions: body,
        status: "write",
      });
      postDataJson("TestingTest/Result", body).then((result) => {
        this.setState({
          result: body,
          questionsResult: body.questionAnswers,
          status: "result",
        });
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

  selectTest(event){
    var id = event.target.attributes.getNamedItem('key-date').value;

    postData("TestingTest/GetTest", { id: id }).then((body) => {
      console.log('body ', body);
      this.setState({
        questions: body,
        status: "write",
      });
    });
  }
  // Для написания вопросов
  onBack(event){
    console.log('selectBack');
  }

  onResult(event){
    console.log('selectResult');
    postDataJson("TestingTest/Result", this.state.questions).then((result) => {
      console.log('Result', result);
      this.setState({
        result: result,
        questionsResult: result.questionAnswers,
        status: "result",
      });
    });
  }

  selectAnser(event){
    // key-number
    // event.target.attributes.getNamedItem('key-number').value
    const number = event.target.attributes.getNamedItem('key-number').value;
    const answer = this.state.questions[this.state.selectQuest].answers[number];
    var questions = this.state.questions;

    console.log('selectAnser', number, this.state.questions[this.state.selectQuest].answers[number]);
    console.log('answers', questions[this.state.selectQuest].rightAnswers, number, questions[this.state.selectQuest].rightAnswers.includes(answer));

    if (questions[this.state.selectQuest].rightAnswers.includes(answer)) {
      var numberAnswer = null;// answer
      questions[this.state.selectQuest].rightAnswers.splice(questions[this.state.selectQuest].rightAnswers.indexOf(answer), 1);
    }else{
      questions[this.state.selectQuest].rightAnswers.push(answer);
    }
    
    this.setState({
      questions: questions
    });
  }

  onNext(event){
    if (this.state.questions.length-1 > this.state.selectQuest) {
      this.setState({
        selectQuest: this.state.selectQuest + 1
      });
    }
  }

  onBack(event){
    console.log('onBack');
    if (this.state.selectQuest >= 0) {
      this.setState({
        selectQuest: this.state.selectQuest - 1
      });
    }
  }

  onQuestion(event){// key-number
    console.log('onQuestion');
    this.setState({
      selectQuest: event.target.attributes.getNamedItem('key-number').value
    });
  }

  // Для результат
  onQuestionResult(event){
    console.log('onQuestionResult');
    this.setState({
      selectQuest: event.target.attributes.getNamedItem('key-number').value
    });
  }

  render(){
    // Views
    var testsView = [];
    var view = [];
    if(this.state.status === "select"){
      for(var i=0; i < this.state.tests.length; i++){
        testsView.push(<ListGroup.Item key={'test-' + i} style={{ width: '100%' }}  onClick={this.selectTest} key-date={this.state.tests[i].id} 
            on as="li" key-date={this.state.tests[i].id}>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{this.state.tests[i].description}</Tooltip>}>
            <span>{this.state.tests[i].name} ({this.state.tests[i].questions})</span>
          </OverlayTrigger>
          </ListGroup.Item>
        );
      }
      view = (<div style={{display: "flex", marginTop:'1%', paddingRight:'1%'}} ><ListGroup as="ul" className="themes">
      <h1 style={{width:'100%',textAlign:'center'}}>Tests</h1>
      {testsView}
    </ListGroup>
    <div style={{width:'100%', height:'30%', position:'relative'}}>
      <h1 style={{width:'100%',textAlign:'center', height:'50%',}}>Password</h1>
      <div style={{display: 'flex', marginTop: '1%', paddingRight: '1%', position: 'absolute', left:'25%'}} >
        <FormControl onChange={this.setNameTest} style={{width:'250px', }} onChange={this.onChangePassword}
              aria-label="lg" aria-describedby="inputGroup-sizing-sm" placeholder={"Password"} value={this.state.password}/>
        <Button variant="success" style={{marginBottom:'5px'}} onClick={this.checkingPassword}>Check passwords</Button>
      </div> </div></div>);
    } else if(this.state.status === "write"){
      /*
allAnswers: false
answers: (5) ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4", "Ответ 5"]
appraisal: 5
countAnswers: 5
description: "Текст ВОПРОСА 1"
id: "quest1"
name: "Question 1"
rightAnswers: null
thema: null
themaId: "thema-1"
typeAnswer: 2
      */
     var allQuestions = [];
     var answersView = [];
     for(var i=0;i<this.state.questions.length;i++){
       // Если выбран хотя бы один ответ изменить цвет ответа
       // Сделать таймер!
       // Если таймер вышел, то выключать!
        allQuestions.push(<ListGroup.Item  key={'quest-' + i} key-id={this.state.questions[i].id} key-number={i} on onClick={this.onQuestion}
          active={this.state.selectQuest==i}>{this.state.questions[i].name}</ListGroup.Item>);
     }
     for(var i=0; i < this.state.questions[this.state.selectQuest].answers.length; i++){
      var status = this.state.questions[this.state.selectQuest].rightAnswers.includes(this.state.questions[this.state.selectQuest].answers[i]);
      // variant="success"
      // variant="danger"
      answersView.push(<ListGroup.Item key={i.toString()} style={{textAlign:'center'}} 
        as="li" active={false} onClick={this.selectAnser} key-number={i}
        active={status}>{this.state.questions[this.state.selectQuest].answers[i]}</ListGroup.Item>)
     }
      view = (
        <div style={{alignSelf:'center', display: "flex"}}>
          {/* All question */}
          <div style={{width:'30%'}}>
          <ListGroup>
            {allQuestions}
          </ListGroup>
          </div>
          {/* this question */}
          <div style={{width:'70%'}}>
          <h2 style={{textAlign:'center'}}>
            {this.state.questions[this.state.selectQuest].name}
          </h2>
          <h4 style={{textAlign:'center'}}>{this.state.questions[this.state.selectQuest].description}</h4>
          {answersView}
          <div style={{marginTop:'3%'}}>
            <Button style={{width:'40%', marginRight:'7%', marginLeft:'7%'}} onClick={this.onBack} variant="primary">Back</Button>
            <Button style={{width:'40%', }} onClick={this.onNext} variant="primary">Next</Button>
          </div>
          <Button style={{width:'87%', marginTop:'3%',marginRight:'7%', marginLeft:'7%'}} onClick={this.onResult} variant="primary">Result</Button>
        </div>
        </div>
      )
    }else{// Результаты:
      var allQuestions = [];
      var answersView = [];
       /*
appraisal: 0
correctly: 4
correctlyQuestions: 4
dateFinish: "0001-01-01T00:00:00"
dateStart: "0001-01-01T00:00:00"
departament: null
group: null
id: "315a3ea3-d600-4669-9a0d-5bea0a72e358"
ipAddress: "::1"
mark: null
markId: null
mistakes: 0
questionAnswers: [{id: "fab5f6be-f4bb-40e4-a7c6-28c71d4902a3", testStudentId: null, questionId: "quest1", time: 0,…},…]
studentUser: null
studentUserId: null
test: null
testId: null
time: 0
username: null

      answers:
answers: ["Ответ 1"]
appraisal: 0
dateAnswer: "0001-01-01T00:00:00"
description: "Текст ВОПРОСА 1"
error: 0
id: "fab5f6be-f4bb-40e4-a7c6-28c71d4902a3"
name: "Question 1"
questionAnswers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4", "Ответ 5"]
questionId: "quest1"
questionRightAnswers: ["Ответ 1"]
status: true
successfully: 0
testStudentId: null
time: 0
        */
      for(var i=0;i<this.state.questions.length;i++){
        // Если выбран хотя бы один ответ изменить цвет ответа
        // Сделать таймер!
        // Если таймер вышел, то выключать!
        allQuestions.push(<ListGroup.Item  key={'quest-' + i} key-number={i} key-id={this.state.questions[i].id} on onClick={this.onQuestionResult}
            active={this.state.selectQuest==i}>{this.state.questions[i].name}</ListGroup.Item>);
      }
      for(var i=0;i<this.state.questions[this.state.selectQuest].answers.length;i++){
        // answersView.push(<Form.Check key={"answer-"+i.toString()} 
        //     key-answer={this.state.questions[this.state.selectQuest].answers[i]} 
        //     onClick={this.selectAnser} style={{textAlign:'center'}} 
        //     type="checkbox" label={this.state.questions[this.state.selectQuest].answers[i]} />);
        answersView.push((<ListGroup.Item key={i.toString()} style={{textAlign:'center'}} 
        as="li" 
        key-answer={this.state.questions[this.state.selectQuest].answers[i]}
        active={status}>{this.state.questions[this.state.selectQuest].answers[i]}</ListGroup.Item>))
      }
      view = (
        <div style={{alignSelf:'center', display: "flex"}}>
          {/* All question */}
          <div style={{width:'30%'}}>
          <ListGroup>
            {allQuestions}
            </ListGroup>
          </div>
          {/* this question */}
          <div style={{width:'70%'}}>
          <h1 style={{textAlign:'center'}}>Result</h1>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Time</td>
                <td>24:00</td>
              </tr>
              <tr>
                <td>Balls</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Percent</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Correct answers (incorrect answers)</td>
                <td>25 (5)</td>
              </tr>
            </tbody>
          </Table>
          <h2 style={{textAlign:'center'}}>
            {this.state.questions[this.state.selectQuest].name}
          </h2>
          <h4 style={{textAlign:'center'}}>{this.state.questions[this.state.selectQuest].description}</h4>
          {answersView}
          <Button style={{width:'87%', marginTop:'3%',marginRight:'7%', marginLeft:'7%'}} onClick={this.onQuestionResult} variant="primary">Menu</Button>
        </div>
        </div>
      )
    }
    

    return view;
  }
}
