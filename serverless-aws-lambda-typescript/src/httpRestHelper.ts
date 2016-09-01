import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class HttpRestHelper {
    private _url: string = 'https://jsonplaceholder.typicode.com/posts';
    private _config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    public getPosts(): AxiosPromise {
        return axios.get(this._url, this._config);
    }
}
