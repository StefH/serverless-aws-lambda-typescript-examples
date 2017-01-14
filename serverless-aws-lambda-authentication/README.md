### Install

Install node.js packages :
```bash
npm i
```

### Bundle with webpack

To just bundle and see the output result use:
```bash
serverless webpack --out dist
```


### Run a function locally

To run your bundled functions locally you can:
```bash
serverless webpack invoke --function serverlessAWSLambdaAuthentication
```


### Deploy

To deploy use:
```bash
serverless deploy
```
