import React from 'react';
import './../../App.css';
import {Button,Dropdown,DropdownButton,FormControl,InputGroup,Table, ListGroup, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData, postDataJson } from './../../helpers/Requests';

export default class Article extends React.Component {
  constructor(props){
    super(props);
    this.state={
      articles: [],
    };
    this.setPage = this.setPage.bind(this);
  }
  componentDidMount(){
    /*
comments: null
dislikeUsers: null
id: "article-1"
likeUsers: null
text: "Text qweqwqewqe"
title: "Name article"
userCreate: null
userCreateId: "qw"
viewer: 0
    */
    getData("Articles/GetAll").then(body=>{
      const json = JSON.parse(body);
      this.setState({
        articles: json
      });
    });
  }

  setPage(event){
    const id = event.target.attributes.getNamedItem('key-data');// .value
    console.log('set page',id);
    
  }

  componentWillReceiveProps(){

  }

  render(){
    var articlesView =[];
    for (var index = 0; index < this.state.articles.length; index++) {
      const element = this.state.articles[index];
      console.log(element.id);
      
      articlesView.push(
      <Card key={"article-"+index} style={{ width: '40rem',margin:'0 auto' }} onClick={this.setPage} key-data={element.id} >
        <Card.Img variant="top" src={element.image} />
        <Card.Body>
          <Card.Title>{element.title}</Card.Title>
          <Card.Text>
            {element.text.substr(0, 50)}
          </Card.Text>
        </Card.Body>
      </Card>
      );
    }
    return (
      <>
      <div style={{width:'100%', alignSelf:'cemter'}}>
        {articlesView}
      </div>
      </>
    )
  }
}

