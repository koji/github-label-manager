import prompts from 'prompts';

// setup token, owner, repo

// const githubSetup = [
//   {
//     type: 'text',
//     name: 'token',
//     message: 'Please type your personal token'
//   },
//   {
//     type: 'text',
//     name: 'owner',
//     message: 'What is your GitHub username?'
//   },
//   {
//     type: 'text',
//     name: 'repo',
//     message: 'Which repo do you want to work on?'
//   }
// ];

const actions = [
  {
      type: 'multiselect',
      name: 'labelAction',
      message: 'select an action',
      choices: [
        { title: 'create a label', value: 0 },
        { title: 'create multiple labels', value: 1 },
        { title: 'delete a label', value: 2 },
        { title: 'delete all labels', value: 3 },
      ],
    }

];

(async () => {
  // const response = await prompts(githubSetup);
  // const {token, owner, repo} = response;
  // const userInfo = {
  //     owner: owner,
  //     repo: repo,
  // };

  // console.log(userInfo);

  // if (token && owner && repo) {
    const selectedAction = await prompts(actions);
    console.log('selectedAction', selectedAction);
    const { labelAction } = selectedAction;
    console.log(labelAction[0]); 
  // }



})();