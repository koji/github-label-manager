# github label manager

Simple CLI tool to create/delete labels with GitHub Labels API.  

### Labels API

https://docs.github.com/en/rest/reference/issues#labels

`label data format`

```json
// label format
{
  "id": 3218144327,
  "node_id": "MDU6TGFiZWwzMjE4MTQ0MzI3",
  "url": "https://api.github.com/repos/koji/frontend-tools/labels/wontfix",
  "name": "wontfix",
  "color": "ffffff",
  "default": true,
  "description": "This will not be worked on"
}
```

### What this script can do is the below.

1. Create a single label on a specific repo
2. Create multiple labels on a specific repo
3. Delete a single label from a specific repo
4. Delete all labels from a specific repo

### Requirement: Personal Token about repo

You can generate a token [here](https://github.com/settings/tokens).

### What you will need to input

1. Operation  
   0: Cancel (terminate the process)  
   1: Create a single label on a specific repo  
   2: Create multiple labels on a specific repo  
   3: Delete a single label from a specific repo  
   4: Delete all labels from a specific repo
2. Token
3. Your GitHub Id
4. Target repo name

If you want to create/delete a single label, you need to type the followings.

#### create

- label name
- label color (technically optional)
- label description (technically optional)

#### delete

- label name

In terms of multiple labels, this script is using `label.js` to define name, color and description. The format is very simple.  
If you want to put your own labels, you will need to modify `label.js` file.

```js
module.exports = Object.freeze([
  {
    name: "Type: Bug Fix",
    color: "FF8A65",
    description: "Fix features that are not working",
  },
  {
    name: "Type: Enhancement",
    color: "64B5F7",
    description: "Add new features",
  },
```

## How to use this

clone this repo and run `app.js`

```zsh
$ git clone https://github.com/koji/github-label-manager.git
$ cd github-label-manager

# use yarn
$ yarn start

# use npm
$ npm start
```

After execute the command, you will need to type some information.

#### create single label

https://user-images.githubusercontent.com/474225/130164576-80e52b14-d4c3-4cd4-a319-4a34832a6452.mov

#### create multiple labels

https://user-images.githubusercontent.com/474225/130164580-39959f7b-6bdc-4405-97c6-adbedb3dfc1a.mov

```zsh
$ yarn start
yarn run v1.22.10
$ node src/app.js

[1] single label
[2] multiple labels
[3] delete label
[4] delete all labels
[0] CANCEL

Create a single label or multiple labels from json [1...4 / 0]: 2
Github token: ****************************************
Please type your GitHub account koji
Please type your target repo name github-label-manager
Created all labels
201: Created Status: Inactive (Abandoned)
201: Created Status: Inactive (Invalid)
201: Created Status: Canceled
201: Created Effort Effortless
201: Created Type: Improvement
201: Created Type: Optimization
201: Created Priority: ASAP
201: Created Type: Modification
201: Created Type: Enhancement
201: Created Status: Completed
201: Created Status: Pending
201: Created Type: Bug Fix
201: Created Status: In Progress
201: Created Effort Heavy
201: Created Status: Inactive (Won't Fix)
201: Created Effort Light
201: Created Priority: Medium
201: Created Effort Painful
201: Created Priority: Safe
201: Created Status: Available
201: Created Priority: Low
201: Created Effort Normal
201: Created Feedback Suggestion
201: Created Feedback Question
201: Created Feedback Discussion
201: Created Status: Inactive (Duplicate)
201: Created Priority: High
201: Created Type: Security Fix
✨  Done in 21.52s.
```

### Article

https://seantrane.com/posts/logical-colorful-github-labels-18230/
