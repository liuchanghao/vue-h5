import axios from 'axios';
import { Toast } from 'vant';
// import store from '@/store';

// create an axios instance
const service = axios.create({
    baseURL: '/', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        return config;
    },
    error => {
        // do something with request error
        console.log(error);// for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data;
        return res;
        // return Promise.reject(new Error(res.message || 'Error'))
    },
    error => {
        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

// export default service;
const request = (method = 'GET') => (url, data = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: method,
			baseURL: '',
			url,
			params: method === 'GET' ? data : {},
			data: data,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			timeout: 10000
		}).then((response) => {
            console.log('---response---', response.data);
            const res = response.data;
            // if(res.status.name === 'FAIL') return Promise.reject(new Error(res.message || 'Error'));
            if(res.status.name === 'FAIL') {
                Toast.fail(res.message);
                return reject(res.message);
            }
            resolve(res.info);
		}).catch((error) => {
			console.log('---http error---', error);
			reject(error);
		})
	})
};

export default {
	get: request('GET'),
	post: request('POST'),
	put: request('PUT'),
	delete: request('DELETE')
}