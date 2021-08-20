# github label manager
This is very simple script to create/delete labels.  
This script is using GitHub Labels API.  

### Labels API
https://docs.github.com/en/rest/reference/issues#labels  

`label data format`
```json
// label format
  {
    id: 3218144327,
    node_id: 'MDU6TGFiZWwzMjE4MTQ0MzI3',
    url: 'https://api.github.com/repos/koji/frontend-tools/labels/wontfix',
    name: 'wontfix',
    color: 'ffffff',
    default: true,
    description: 'This will not be worked on'
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


### Article
https://seantrane.com/posts/logical-colorful-github-labels-18230/  