import {URL} from './Contants';
import axios from 'axios';

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(URL + url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return await response.json();
  }

  export async function getData(url = '', data = {}) {
    const response = await fetch(URL + url);
    return response.text();
  }