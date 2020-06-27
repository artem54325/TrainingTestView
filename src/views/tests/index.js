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
      dateTime: Date.now()
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
      console.log('get test ', body);
      for(var i = 0; i < body.length; i++){
        body[i].rightAnswers = [];
      }
      this.setState({
        questions: body,
        status: "write",
      });
      // for(var i=0;i<body.length;i++){
      //   body[i].rightAnswers.push("Ответ 1");
      // }
      // postDataJson("TestingTest/Result", body).then((result) => {
      //   console.log('get result', result)
      //   this.setState({
      //     result: result,
      //     questionsResult: result.questionAnswers,
      //     status: "result",
      //   });
      // });
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

  setTimeQuestion(){
    var number = this.state.selectQuest;
    var questions = this.state.questions;
    var timeOld = this.state.dateTime;
    var timeNow = Date.now();
    console.log('time', questions[number].time);
    
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
      answersView.push(<ListGroup.Item key={i.toString()} style={{textAlign:'center'}} 
        as="li" active={false} onClick={this.selectAnser} key-number={i}
        active={status}>{this.state.questions[this.state.selectQuest].answers[i]}</ListGroup.Item>)
     }
     setTimeQuestion();
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
       // time
      for(var i=0;i<this.state.questionsResult.length;i++){
        // Если выбран хотя бы один ответ изменить цвет ответа
        // Сделать таймер!
        // Если таймер вышел, то выключать!
        var status = "danger"
        
        if (this.state.questionsResult[i].status) {
          status = "success";
        }

        allQuestions.push(<ListGroup.Item  key={'quest-' + i} key-number={i} key-id={this.state.questionsResult[i].id} on onClick={this.onQuestionResult}
            variant={status} active={this.state.selectQuest==i}>{this.state.questionsResult[i].name}</ListGroup.Item>);
      }
      for(var i=0;i<this.state.questionsResult[this.state.selectQuest].questionAnswers.length;i++){
        var status = "light";

        if (this.state.questionsResult[this.state.selectQuest].questionRightAnswers.includes(this.state.questionsResult[this.state.selectQuest].questionAnswers[i])) {
          status = "primary";
        }

        if (this.state.questionsResult[this.state.selectQuest].answers.includes(this.state.questionsResult[this.state.selectQuest].questionAnswers[i])) {
          status = "danger";
          if (this.state.questionsResult[this.state.selectQuest].questionRightAnswers.includes(this.state.questionsResult[this.state.selectQuest].questionAnswers[i])) {
            status = "success";
          }
        }
        answersView.push((<ListGroup.Item key={i.toString()}  
          as="li" style={{textAlign:'center'}}
          key-answer={this.state.questionsResult[this.state.selectQuest].questionAnswers[i]}
          variant={status}>{this.state.questionsResult[this.state.selectQuest].questionAnswers[i]}</ListGroup.Item>))
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
                <td>{this.state.result.time}</td>
              </tr>
              <tr>
                <td>Balls</td>
                <td>{this.state.result.appraisal}</td>
              </tr>
              <tr>
                <td>Percent</td>
                <td>{this.state.result.correctlyQuestions * 100 / (this.state.result.correctlyQuestions + this.state.result.mistakes)} %</td>
              </tr>
              <tr>
                <td>Correct answers (incorrect answers)</td>
                <td>{this.state.result.correctlyQuestions} ({this.state.result.mistakes})</td>
              </tr>
            </tbody>
          </Table>
          <h2 style={{textAlign:'center'}}>
            {this.state.questions[this.state.selectQuest].name}
          </h2>
          <h4 style={{textAlign:'center'}}>{this.state.questions[this.state.selectQuest].description}</h4>
          {answersView}
          <Button style={{width:'87%', marginTop:'3%',marginRight:'7%', marginLeft:'7%'}} onClick={this.onQuestionResult} variant="primary">Menu</Button>
          <div>
            <h2>Helpers</h2>
            <h4>Green - Сorrect answer</h4>
            <h4>Red - Error answer</h4>
            {/* <h4>Gray - Right answer</h4> */}
            <h4>Blue - Сorrect answer but not selected</h4>
          </div>
        </div>
        </div>
      )
    }
    

    return view;
  }
}
