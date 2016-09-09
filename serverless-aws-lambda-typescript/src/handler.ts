import { SES } from 'aws-sdk';
import { AxiosResponse } from 'axios';
import { Context, Callback } from 'aws-lambda';
import { HttpRestHelper } from './httpRestHelper';
import { Post } from './post';

exports.handleIt = function(event: any, context: Context, callback: Callback) {
    console.log('Context : ' + JSON.stringify(context));

    let helper: HttpRestHelper = new HttpRestHelper();

    // load AWS SES (as demo)
    let ses: SES = new SES({ apiVersion: '2010-12-01' });

    helper.getPosts()
        .then((response: AxiosResponse) => {
            let posts: Post[] = response.data as Post[];
            callback(null, {
                message: 'Your get request executed successfully',
                data: posts[0]
            });
        })
        .catch((err: any) => {
            callback(null, { message: 'Get request executed with error : ' + err});
        });
};
