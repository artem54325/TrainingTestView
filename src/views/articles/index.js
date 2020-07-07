import React from 'react';
import './../../App.css';
import {Button,Dropdown,DropdownButton,FormControl,InputGroup,Table, ListGroup, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData, postDataJson } from './../../helpers/Requests';
import FlatList from 'flatlist-react';

export default class Article extends React.Component {
  constructor(props){
    super(props);
    this.state={
      articles: [],
    };
    this.setPage = this.setPage.bind(this);
    this.renderArticles = this.renderArticles.bind(this);
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

  renderArticles(article, idx){
   return(
    <Card key={"article-"+idx} style={{ width: '40rem',margin:'0 auto', marginTop: '15px' }} onClick={()=>{window.location.assign('/Article='+article.id);}} key-data={article.id} >
    <Card.Img variant="top" src={article.image} />
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>
        {article.text.substr(0, 50)}
      </Card.Text>
    </Card.Body>
  </Card>
   )
  }

  render(){
    return (
      <>
      <div style={{width:'100%', alignSelf:'cemter'}}>
      <FlatList
          list={this.state.articles}
          renderItem={this.renderArticles}
          renderWhenEmpty={() => <div>List is empty!</div>}
          numColumns={2}
          keyExtractor={item => item.id}
          // sortBy={["firstName", {key: "lastName", descending: true}]}
          // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
        />
      </div>
      </>
    )
  }
}

