### Install

Install node.js packages and install typings :
```bash
npm i
```

### Bundle with webpack

To just bundle and see the output result use:
```
serverless webpack --out dist
```


### Run a function locally

To run your bundled functions locally you can:
```
serverless webpack invoke --function serverlessAWSLambdaTS
```


### Deploy

To deploy use:
```bash
serverless deploy
```
