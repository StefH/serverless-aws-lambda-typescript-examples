import * as fs from 'fs';
import { SES, Config } from 'aws-sdk';
import { AxiosResponse } from 'axios';
import { Context, Callback } from 'aws-lambda';
import { HttpRestHelper } from './httpRestHelper';
import { Post } from './post';

exports.handleIt = function(event: any, context: Context, callback: Callback) {
    let helper: HttpRestHelper = new HttpRestHelper();

    // let cfg = JSON.parse(fs.readFileSync('./aws-config.json', 'utf8'));

    // Load AWS settings
    // new Config(cfg);

    // load AWS SES (as demo)
    let ses: SES = new SES({ apiVersion: '2010-12-01' });

    helper.getPosts()
        .then((response: AxiosResponse) => {
            let posts: Post[] = response.data as Post[];
            let post: Post = posts[0];
            post.time = new Date();

            callback(null, {
                message: 'Your get request executed successfully',
                data: post
                // config: cfg
            });
        })
        .catch((err: any) => {
            callback(null, { message: 'Get request executed with error : ' + err});
        });
};
