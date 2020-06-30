import React from 'react';
import './../../App.css';
import {Button,FormControl, ListGroup, OverlayTrigger, Tooltip, Form, Table} from 'react-bootstrap';

export default class CreateTest extends React.Component {
  constructor(props){
    super(props)
    this.saveLink = this.saveLink.bind(this);
  }
  saveLink(event){

  }

  render(){
    return (
      <div style={{height:'100vh', width:'100vw', display:'flex', position:'relative'}}>
        <div style={{height:'100vh', width:'70vw', background:'black'}}>
          qweewq
        </div>
        <div style={{height:'100vh', width:'30vw', background:'white'}}>
          
        </div>
        <Button style={{position:'absolute', marginTop: '20px' ,marginLeft:'10px'}} variant="primary">Save Link</Button>
      </div>
      );
  }

}
