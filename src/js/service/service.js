export default class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  get(endpoint, params = null) {
    return this.httpRequest('GET', this.baseUrl + endpoint, params);
  }

  post(endpoint, params) {
    return this.httpRequest('POST', this.baseUrl + endpoint, params);
  }

  getUserDetails(endpoint,token) {
    return this.httpRequestUserDetails('GET', this.baseUrl + endpoint, token);
  }

  httpRequestUserDetails(method, url, token) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
        method: method,
      };
      
      console.log('body', options)
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          resolve(responseJson);
        })
        .catch(error => reject(error)); //to catch the errors if any
    });
  }

  httpRequest(method, url, params) {
    return new Promise((resolve, reject) => {
      let options;
      if (method == 'GET') {
        options = {
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
          },
          method: method,
        };
      } else {
        options = {
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
          },
          method: method,
          body: params,
        };
      }
      console.log('body', options)
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          resolve(responseJson);
        })
        .catch(error => reject(error)); //to catch the errors if any
    });
  }
}
