import {URL} from './Contants';

  export async function postData(url = '', data = {}) {
    const formData = new FormData();
    
    for(var key in data){
      console.log(key, data[key])
      formData.append(key, data[key]);
    }

    const response = fetch(URL + url, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: formData
    });
    return (await response).json();
  }

  export async function postDataJson(url = '', data = {}) {
    const response = fetch(URL + url, {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return (await response).json();
  }

  export async function getData(url = '', data = {}) {
    const response = await fetch(URL + url);
    return response.text();
  }