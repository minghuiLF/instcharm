// change this when you integrate with the real API, or when u start using the dev server
const API_URL = 'http://127.0.0.1:5000/user'
const LOGIN_URL = 'http://127.0.0.1:5000/auth/login'
const SIGNUP_URL = 'http://127.0.0.1:5000/auth/signup'
const POST_URL = 'http://127.0.0.1:5000/post'

const getJSON = (path, options) =>
    fetch(path, options)
        .catch(err => console.warn(`API_ERROR: ${err.message}`));



/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */


export class USER {

    /**
     * Defaulsts to teh API URL
     * @param {string} url
     */
    constructor(url = API_URL) {
        this.url = url;
    }

    /**
     * @param {string} path
     * @param {string} options
     * @returns feed array in json format
     *
     */
    makeUSERRequest(path,options) {
        return getJSON(`${this.url}/${path}`,options);
    }

    /**
     * @param {string} p What post to start at, 0 by default
     * @param {string} n Number of posts to fetch, 10 by default
     * @returns feed array in json format
     *
     */
    getFeed(p=0,n=10) {
      var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      var message={
          method: 'GET', // or 'PUT'
          headers:{
            'Content-Type': 'application/json',
            'Authorization':`Token ${token}`,

          }
        }
        return this.makeUSERRequest(`feed?p=${p}&n=${n}`,message);
    }

    /**
     * @returns auth'd user in json format
     */
    getMe() {
        var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        var message={
            method: 'GET', // or 'PUT'
            headers:{
              'Content-Type': 'application/json',
              'Authorization':`Token ${token}`,

            }
          }
        return this.makeUSERRequest('',message);
    }

    getSomeonbyID(id) {
        var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        var message={
            method: 'GET', // or 'PUT'
            headers:{
              'Content-Type': 'application/json',
              'Authorization':`Token ${token}`,

            }
          }
        return this.makeUSERRequest(`?id=${id}`,message);
    }

}
export class POST {
  constructor(url = POST_URL) {
      this.url = url;
  }

  makePOSTRequest(path,options) {
      return getJSON(`${this.url}/${path}`,options);
  }
  getPost(id) {
    var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    var message={
        method: 'GET', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`,

        }
      }
      return this.makePOSTRequest(`?id=${id}`,message);
  }

  likePsot(id){
    var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    var message={
        method: 'PUT', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`,

        }
      }

      return this.makePOSTRequest(`like?id=${id}`,message);
    }

  unlikePsot(id){
    var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    var message={
        method: 'PUT', // or 'PUT'
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`,

        }
      }

      return this.makePOSTRequest(`unlike?id=${id}`,message);
    }
  uploadPsot(des,src){
    var token=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    var data = {
      "description_text": des,
      "src": src
    }
    var message={
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`,

        }
      }

      return this.makePOSTRequest(``,message);
    }
}



export class LOGIN {

    /**
     * Defaults to teh LOGIN URL
     * @param {string} url
     */
    constructor(url = LOGIN_URL) {
        this.url = url;

    }
    /**
     * @param {string} unsername
     * @param {string} password
     * @returns response
     */
    makeLOGINRequest(username,password) {
      var data = {
        "username": username,
        "password": password
      }
      var message={
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }

        return getJSON(`${this.url}`,message);
    }



}

export class SIGNUP {

    /**
     * Defaults to teh LOGIN URL
     * @param {string} url
     */
    constructor(url = SIGNUP_URL) {
        this.url = url;

    }
    /**
     * @param {string} unsername
     * @param {string} password
     * @param {string} email
     * @param {string} name
     * @returns response
     */
    makeSIGNUPRequest(username,password,email,name) {
      var data = {
        "username": username,
        "password": password,
        "email": email,
        "name": name
      }
      var message={
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }

        return getJSON(`${this.url}`,message);
    }



}
