# github label manager

Simple CLI tool to create/delete labels with GitHub Labels API.

<img width="846" alt="Screen Shot 2021-08-23 at 1 02 53 AM" src="https://user-images.githubusercontent.com/474225/130393065-3f2a6fed-f6a3-4b1b-8e5f-ee4fee43d70f.png">

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
$ yarn # install packages
$ yarn build # compile typescript
$ yarn start # run index.js

# use npm
$ npm install
$ npm run build
$ npm start

# or use ts-node
$ npx ts-node src/index.ts # this might be slow
```

After execute the command, you will need to type some information.

- GitHub personal token
- GitHub id
- Target repo name
- new label name (when you seslect `create a label`)
- label name you want to delete (when you seslect `delete a label`)

`create labels` is based on `labels` in `src/constant.ts`   
https://github.com/koji/github-label-manager/blob/main/src/constant.ts#L59-L208   
```js
{
  name: 'Type: Bug Fix',
  color: 'FF8A65',
  description: 'Fix features that are not working',
},
{
  name: 'Type: Enhancement',
  color: '64B5F7',
  description: 'Add new features',
},
```


https://user-images.githubusercontent.com/474225/130368605-b5c6410f-53f6-4ef0-b321-8950edeebf7d.mov

### Article
https://levelup.gitconnected.com/create-github-labels-from-terminal-158d4868fab    
https://seantrane.com/posts/logical-colorful-github-labels-18230/  
