// change this when you integrate with the real API, or when u start using the dev server
const API_URL = 'http://127.0.0.1:8080/data'
const LOGIN_URL = 'http://127.0.0.1:5000/auth/login'
const SIGNUP_URL = 'http://127.0.0.1:5000/auth/signup'

const getJSON = (path, options) =>
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));
const logIN = (path, options) =>
     fetch(path, options)
        .catch(err => console.warn(`API_ERROR: ${err.message}`));
const signUP = (path, options) =>
     fetch(path, options)
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */


export class API {

    /**
     * Defaults to teh API URL
     * @param {string} url
     */
    constructor(url = API_URL) {
        this.url = url;
    }

    makeAPIRequest(path) {
        return getJSON(`${this.url}/${path}`);
    }

    /**
     * @returns feed array in json format
     */
    getFeed() {
        return this.makeAPIRequest('feed.json');
    }

    /**
     * @returns auth'd user in json format
     */
    getMe() {
        return this.makeAPIRequest('me.json');
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

        return logIN(`${this.url}`,message);
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
    makeSIGNUPRequest(username,password) {
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

        return logIN(`${this.url}`,message);
    }



}
