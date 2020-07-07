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
      article: [],
      comments: [],
      commentText: "",
      idArticle: this.props.match.params.id,
    };
    this.error = null;
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
   
    getData("Articles/Get?id=" + this.state.idArticle).then(body=>{
      const json = JSON.parse(body);
      if (json === null) {
        // Errors 
        this.error = null;
      }
      console.log(json);
      
      this.setState({
        article: json
      });
    });
  }

  addComments(){
    postDataJson("",{}).then(body=>{

    }).catch(error=>{
      console.log('Add comment', error);
      
    })
  }
  renderComments(comment, idx){

  }

  componentWillReceiveProps(){

  }

  render(){
    if (this.error !== null) {
      return (<>
        <div style={{width:'100%', alignSelf:'cemter'}}>
          <h1 style={{}}>There is no such article</h1>
        </div>
        </>);
    }
    return (
      <>
      <div style={{width:'100%', alignSelf:'cemter'}}>
        <h2>Title</h2>
        <div>
          Descriptions
        </div>
        <div>
          Count Like and count comments
        </div>
        <div>
          Comments
          <FlatList
            list={this.state.comments}
            renderItem={this.renderComments}
            renderWhenEmpty={() => <div>No comments!</div>}
            numColumns={2}
            keyExtractor={item => item.id}
            // sortBy={["firstName", {key: "lastName", descending: true}]}
            // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
          />
        </div>
      </div>
      </>
    )
  }
}

