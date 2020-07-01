import React from 'react';
import './../../App.css';
import {Button, Dropdown,DropdownButton,FormControl,InputGroup, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './index.css';
import {getData, postDataJson} from '../../helpers/Requests';
import { v4 as uuidv4 } from 'uuid';


var types = ["Один правильный", "Несколько правильных"];
export default class CreateThemes extends React.Component {

  constructor(props){
    super(props);
    this.state={
      themes: [],
      questions: [],

      idThema: null,
      idQuestion: null,

      status: true
    };

    this.setNameThema = this.setNameThema.bind(this);
    this.setNameQuestion = this.setNameQuestion.bind(this);
    this.setDescriptionQuestion = this.setDescriptionQuestion.bind(this);
    this.setNameAnswer = this.setNameAnswer.bind(this);
    this.createThema = this.createThema.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.setCountQuestions = this.setCountQuestions.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.saveAllThemes = this.saveAllThemes.bind(this);
    this.setOnChangeType = this.setOnChangeType.bind(this);
    this.setIdThema = this.setIdThema.bind(this);
    this.setIdQuestion = this.setIdQuestion.bind(this);
  }

  componentDidMount(){
    getData("CreateTest/GetAllThemes").then(body=>{
      const json = JSON.parse(body);
      this.setState({
        themes: json,
        themesId: json[0].id
      });
    });
  }

  setIdThema(event){
    var id = event.target.attributes.getNamedItem('key-id').value;
    this.setState({ idThema: id });
  }

  setIdQuestion(event){
    var id = event.target.attributes.getNamedItem('key-id').value;
    this.setState({ idQuestion: id });
  }

  setNameThema(event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        themes[i].name = event.target.value;
        this.setState({ themes: themes });
      }
    }
  }

  createThema(){
    var themes = this.state.themes;
    themes.push({
      name: "Themes",
      questions: [],
      id: uuidv4(),
    });
    this.setState({ themes: themes });
  }

  createQuestion(){
    if(this.state.idThema=== null){
      return;
    }
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        themes[i].questions.push({
          id: uuidv4(),
          name: "Question - "+(themes[i].questions.length+1),
          description: "",
          answers: [],
          countAnswers: 0,
          rights: []
        });
        this.setState({ themes: themes });
      }
    }
    this.setState({ themes: themes });
  }

  setNameQuestion(event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          console.log('id question',themes[i].questions[a].id, this.state.idQuestion);
          if(this.state.idQuestion === themes[i].questions[a].id){
            themes[i].questions[a].name = event.target.value;
          }
        }
        this.setState({themes: themes});
      }
    }
  }

  setDescriptionQuestion(event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          if(this.state.idQuestion === themes[i].questions[a].id){
            themes[i].questions[a].description = event.target.value;
          }
        }
        this.setState({themes: themes});
      }
    }
  }

  setCountQuestions(event){
    var count = 0;
    try{
      count = parseInt(event.target.value);
    }catch(err){
      console.log(err);
    }
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          if(this.state.idQuestion === themes[i].questions[a].id){
            if(count>=themes[i].questions[a].answers.length){
              themes[i].questions[a].countAnswers = event.target.value;
            }
          }
        }
        this.setState({themes: themes});
      }
    }
  }

  saveAllThemes(){
    postDataJson("CreateTest/SaveAllThemes", this.state.themes).then((themes) => {
      console.log('themes', themes);
      this.setState({
        themes: themes
      });
    });
  }

  setChecked(event){
    console.log('checked');
    console.log('event', event.target.attributes.getNamedItem('key-val').value);
    var value = event.target.attributes.getNamedItem('key-val').value;
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          if(this.state.idQuestion === themes[i].questions[a].id){
            if (themes[i].questions[a].rightAnswers==null) {
              themes[i].questions[a].rightAnswers = [];
            }
            if(themes[i].questions[a].rightAnswers.includes(value)){
              themes[i].questions[a].rightAnswers.splice(themes[i].questions[a].rightAnswers.indexOf(value), 1);
            }else{
              themes[i].questions[a].rightAnswers.push(value);
            }
          }
        }
        this.setState({themes: themes});
      }
    }
  }

  setOnChangeType(eventKey, event){
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

  setNameAnswer(event){
    for(var i=0;i<this.state.themes.length; i++){
      if(this.state.themes[i].id === this.state.idThema){
        var themes = this.state.themes;
        for(var a =0;a<themes[i].questions.length;a++){
          if(this.state.idQuestion === themes[i].questions[a].id){
            var select = event.target.attributes.getNamedItem('key-date').value;
            themes[i].questions[a].answers[select] = event.target.value;
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
    var themesView = [];
    var questionsView = [];
    var answersView = [];
    // list
    var questions = null;
    var answers = null;
    var rights = null;

    var nameThema = null;
    var nameQuestion = null;
    var answerCountQuestion = null;
    var descriptionQuestion = null;

    for(var i=0;i<this.state.themes.length;i++){
      var act = false;
      if(this.state.themes[i].id === this.state.idThema){
        act = true;
        questions = this.state.themes[i].questions;
        nameThema = this.state.themes[i].name;
      }
      themesView.push(<ListGroup.Item onClick={this.setIdThema} key-id={this.state.themes[i].id} key={i.toString()} as="li" active={act}>{this.state.themes[i].name}</ListGroup.Item>);
    }    

    if(questions!=null){
      for(var i = 0; i < questions.length; i++){
        var act = false;

        if(questions[i].id === this.state.idQuestion){
          act = true;

          nameQuestion = questions[i].name;
          answerCountQuestion = questions[i].countAnswers;
          descriptionQuestion = questions[i].description;

          answers = questions[i].answers;
          rights = questions[i].rightAnswers;
        }

        questionsView.push(<ListGroup.Item onClick={this.setIdQuestion} key-id={questions[i].id} key={i.toString()} as="li" active={act}>{questions[i].name}</ListGroup.Item>);
      }

     if(answers !== null){
      for(var i = 0; i < answers.length || i < answerCountQuestion; i++){
        var activity = false;
        var text = null;
        console.log('includes', rights);
        if (rights==undefined) {
          rights=[] 
        }
        if(i < answers.length){
          text = answers[i];
          if(rights.includes(answers[i])){
            activity = true;
          }
        }
        if (text==null) {
          text="";
        }
        answersView.push(<InputGroup size="sm" className="mb-3" key={i.toString()}>
          <InputGroup.Prepend>
            <InputGroup.Checkbox key-date={i} key-val={text} onClick={this.setChecked} name="answers" checked={activity}/>
            <InputGroup.Text id="inputGroup-sizing-sm">Answer - {i+1}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl key={i.toString()} key-date={i} onChange={this.setNameAnswer} aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={text}/>
        </InputGroup>);
      }
     }
    }

    
    return (
      <div style={{display: "flex", marginTop:'1%'}}>
        {/* Добисать тайтле тема */}
      <ListGroup as="ul" className="themes">
        <h1>Themes</h1>
        <Button variant="outline-secondary" style={{marginBottom:'5px'}} onClick={this.createThema}>Create Thema</Button>
        {themesView}
      </ListGroup>
        {/* Добисать в тайтле вопросы */}
      <ListGroup as="ul" className="questions">
      <h1>Questions</h1>
        <Button variant="outline-secondary" style={{marginBottom:'5px'}} onClick={this.createQuestion}>Create Question</Button>
        {questionsView}
      </ListGroup>
      <div style={{alignSelf:'middle', justifyContent:'center', width:'55%', marginLeft:'4%'}}>
      <InputGroup size="sm" className="mb-3" >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Name Thema</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={this.setNameThema}  aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={nameThema}/>
      </InputGroup>
      <InputGroup size="sm" className="mb-3" >
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Name Question</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={this.setNameQuestion} aria-label="Small" aria-describedby="inputGroup-sizing-sm"  value={nameQuestion}/>
      </InputGroup>
      <InputGroup.Text style={{alignSelf:'center'}}>Description</InputGroup.Text>
      <InputGroup style={{width:'100%'}}>
        <FormControl onChange={this.setDescriptionQuestion} as="textarea" aria-label="With textarea" value={descriptionQuestion}/>
      </InputGroup>
      <div style={{display:'flex'}}>
      <DropdownButton onSelect={this.setOnChangeType} id="dropdown-basic-button" title="Dropdown button" style={{marginTop:'0.5%'}}>
      {types.map((opt, i) => (
          <Dropdown.Item key={i} eventKey={i}>
            {opt}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <InputGroup size="sm" className="mb-3" style={{marginTop:'1%', marginLeft:'3%'}}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">Count questions</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onChange={this.setCountQuestions} aria-label="Small" aria-describedby="inputGroup-sizing-sm" defaultValue={answerCountQuestion} style={{width:50}}/>
      </InputGroup>
      </div>
      <div>
      {answersView}
      </div>
      <Button variant="success" style={{marginBottom:'5px'}} onClick={this.saveAllThemes}>Save all themes</Button>
      </div>
      
      </div>
    )
  }
}
