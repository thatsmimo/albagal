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

	upload(endpoint, params) {
		return this.httpRequestForFormData('POST', this.baseUrl + endpoint, params);
	}

	httpRequestForFormData(method, url, params) {
		return new Promise((resolve, reject) => {
			let options;
			if (method == 'GET') {
				options = {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
					},
					method: method,
				};
			} else {
				options = {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
					},
					method: method,
					body: params,
				};
			}

			fetch(url, options)
				.then(response => response.json())
				.then(responseJson => {
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
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
					},
					method: method,
				};
			} else {
				options = {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer kknp6u9zt1idk6lx5uq6zez7lqzmbmng'
					},
					method: method,
					body: params,
				};
			}
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
