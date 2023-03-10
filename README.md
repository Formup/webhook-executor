# webhook-executor

Listens for webhooks & runs scripts on certain messages.<br>

## Description

Loops through the config file and if any **"match"** object matches to your webhook data it will run the corresponding script.

## Installation

```
npm install -g webhook-executor
```

## Configuration

### Config file

**Config file is required.**<br>
Config file can be located wherever you want and can be named anything but must be valid JSON.
<br>
<br>
Every configuration in the config file must have **"match"** and **"path"** keys like in the example below. If all keys and values defined in the **"match"** object are found in the webhook data, the script defined in **"path"** field will be run. You can have multiple matches to run different scripts.
<br>
<br>
Your config syntax should look something like the one below.

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

Scripts can be located anywhere but they must be type of **.sh** or **.bat**. Specify the script path as in the example below.<br>
`users/user/webhook-executor/scripts/script.sh`<br>

## Usage

You must specify the config file path as in the example below.<br>
`users/user/webhook-executor/config.json`<br>

```
webhook-executor <config>
```
