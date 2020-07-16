import axios from 'axios';
import { Toast } from 'vant';

axios.defaults.baseURL = '/';
axios.defaults.timeout = 5000;

// request interceptor
axios.interceptors.request.use(
    config => {
        // do something before request is sent
        config.metadata = { startTime: new Date() };
        return config;
    },
    error => {
        // do something with request error
        console.log(error);// for debug
        return Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
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
        response.config.metadata.endTime = new Date();
        const duration = response.config.metadata.endTime - response.config.metadata.startTime;
        console.log(`【接口地址】:${response.config.url}【请求方式】:${response.config.method}【请求耗时】:${duration}ms`);
        return response.data;
    },
    error => {
        console.log('err' + error); // for debug
        //请求超时
        if(error === undefined || error.code === 'ECONNABORTED') {
            Toast.fail('服务请求超时');
        }
        return Promise.reject(error);
        // return Promise.reject(new Error(res.message || 'Error'))
    }
);

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
            if(response.status !== 200) {
                Toast.fail(response.message);
                return reject(response.message);
            }
            resolve(response.data);
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