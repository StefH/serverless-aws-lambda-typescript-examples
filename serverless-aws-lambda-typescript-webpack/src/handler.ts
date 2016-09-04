import * as fs from 'fs';
import { SES, Config } from 'aws-sdk';
import { AxiosResponse } from 'axios';
import { Context, Callback } from 'aws-lambda';
import { HttpRestHelper } from './httpRestHelper';
import { IPost } from './post';

exports.handleIt = function(event: any, context: Context, callback: Callback) {
    let helper: HttpRestHelper = new HttpRestHelper();
    let cfg = JSON.parse(fs.readFileSync('./aws-config.json', 'utf8'));

    // Load AWS settings
    new Config(cfg);

    // load AWS SES (as demo)
    let ses: SES = new SES({ apiVersion: '2010-12-01' });

    helper.getPosts()
        .then((response: AxiosResponse) => {
            let posts: IPost[] = response.data as IPost[];
            callback(null, {
                message: 'Your get request executed successfully',
                data: posts[0],
                config: cfg
            });
        })
        .catch((err: any) => {
            callback(null, { message: 'Get request executed with error : ' + err});
        });
};
