# Deployer

## Hook URL

The server listens to the following url:    
```
/deploy/:site
```

Note that the `:site` variable is case-sensitive and used in a number of places.

### 1. Script Name

All scripts are stored in the `/scripts` folder in the following format: `:site` + `.sh` where `:site` is the variable from the url.

So for this url: `deployer.example.com/deploy/bananas`, the script file will be called `bananas.sh`


### 2. Secret Environment Variable

Secrets are not stored on the disk for security reasons. You must use [environment variables](http://stackoverflow.com/a/4870450/1666937). The environment variables will be in this format: `:SITE` + `_KEY` where `:site` will be uppercased.

So for this url: `deployer.example.com/deploy/bananas`, the environment variable will be `BANANAS_KEY`.

*NOTE:* This means `:site` cannot contain any dashes or other special characters!


## Starting Deployer

Before starting deployer, make sure you have an environment variable for each site.   

```BANANAS_KEY=dk23cSAd3j0jvr3JFfdsfs9f9Kda forever start deployer/index.js```


## Stopping Deployer

```forever stop deployer/index.js```

## Modes

By default, the deployer listens for changes to tags. This can be configured to work with changes to master or branches.

#### Master
Add the following to your webhook url:    
`?mode=master`

#### Branch
Add the following to your webhook url:    
`?mode=branch&branch=branchName`
