# webhook-executor

Listens for webhooks & runs scripts on certain messages.<br>

## Description

Loops through the config file and checks if "match" content matches to your webhook data it will run the specific script.

## Installation

```
npm install -g webhook-executor
```

## Configuration

### Config file

You must have config file. Config file can be located where ever you want & can be named anything but must be type of JSON.
<br>
<br>
You must have "match" and "path" as same as below but you can customize match object to work with your data. You can have multiple matches to run different scripts. "match" is the object that will be matched to your webhook data.
<br>
<br>
Your config syntax should look something like below.

### Example of config file

```json
[
    {
        "match": {
            "repository": {
                "full_name": "webhook-executor",
                "private": false,
                "owner": {
                    "name": "owner",
                    "email": "owner@example.com"
                }
            },
            "description": "Listens for webhooks & runs scripts on certain messages.",
            "pusher": {
                "name": "pusher",
                "email": "pusher@example.com"
            },
            "commits": [
                {
                    "committer": {
                        "name": "committer",
                        "email": "committer@example.com",
                        "username": "committer"
                    },

                    "modified": ["index.js"]
                }
            ]
        },

        "path": "users/user/webhook-executor/scripts/script.sh"
    },

    {
        "match": {},
        "path": "here script path"
    }
]
```

### Scripts

Scripts can be located anywhere but they must be type of .sh or .bat. Provide path of your script file example below.<br>
`users/user/webhook-executor/scripts/script.sh`<br>

## Usage

### Run

You must provide path of the config file example below.<br>
`users/user/webhook-executor/config.json`<br>

```
webhook-executor <config>
```
