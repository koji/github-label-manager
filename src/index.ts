import { Octokit } from '@octokit/core';
import readlineSync from 'readline-sync';
import { createSingleLabel } from './lib/createSingleLabel';
import { deleteSingleLabel } from './lib/deleteSingleLabel';
import { createLabel, deleteLabel, createLabels, deleteLabels } from './lib/callApi';
import { AsciiText } from './lib/displayAscii';
import { initialDescription } from './constant';
import readline from 'readline';
// cancel: -1, single: 0, multi: 1, delete label"2, delete all labels: 3
// const labelCreationType = [
//   'single label',
//   'multiple labels',
//   'delete label',
//   'delete all labels',
// ];
// const selectedTypeIndex = readlineSync.keyInSelect(
//   labelCreationType,
//   'Create a single label or multiple labels from json'
// );
// // console.log(selectedTypeIndex);
// if (selectedTypeIndex === -1) {
//   console.log('Canceled');
//   process.exit(1);
// }


let owner: string;
let repo: string;
let octokit: any;
const userInfo = {
  owner: owner,
  repo: repo,
};

// // get information to access github api for managing labels
// const githubToken = readlineSync.question('Github token: ', {
//   hideEchoBack: true,
// });
// const octokit = new Octokit({
//   auth: `${githubToken}`,
// });
// // input owner and repo name
// const owner = readlineSync.question('Please type your GitHub account ');
// const repo = readlineSync.question('Please type your target repo name ');
// const userInfo = {
//   owner: owner,
//   repo: repo,
// };

const setupInfo = () => {
  const githubToken = readlineSync.question('Github token: ', {hideEchoBack: true,});
  octokit = new Octokit({
    auth: `${githubToken}`,
  });
  // input owner and repo name
  userInfo.owner = readlineSync.question('Please type your GitHub account ');
  userInfo.repo = readlineSync.question('Please type your target repo name ');
}


// switch (selectedTypeIndex) {
//   case 0: {
//     const newLabel = createSingleLabel();
//     createLabel(octokit, userInfo, newLabel);
//     break;
//   }
//   case 1: {
//     createLabels(octokit, userInfo);
//     break;
//   }
//   case 2: {
//     const targetLabel = deleteSingleLabel();
//     deleteLabel(octokit, userInfo, targetLabel);
//     break;
//   }
//   case 3: {
//     deleteLabels(octokit, userInfo);
//     break;
//   }
//   default: {
//     console.log('invalid input');
//     break;
//   }
// }

// const result = figlet.textSync('GitHub Label Manager', {
//   font: 'Small',
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 180,
//     whitespaceBreak: true
// });

console.log(AsciiText);

// console.log(`
//   How to use this
//   1. type: set
//   You need to type your personal token, github id, and repo name
//   2. type: c_single
//   This command is to create a single label.
//   You need to type name, color, and description
//   3. tyep: c_multi
//   This command is to create multiple labels that is from label.ts
//   4. type: d_single
//   This command is to delete a single label.
//   You need to type label name
//   5. type: d_all
//   This command is to delete all labels.
//   6. type: bye
//   This command is to terminate the script
// `);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: initialDescription,
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});


// switch (selectedTypeIndex) {
//   case 0: {
//     const newLabel = createSingleLabel();
//     createLabel(octokit, userInfo, newLabel);
//     break;
//   }
//   case 1: {
//     createLabels(octokit, userInfo);
//     break;
//   }
//   case 2: {
//     const targetLabel = deleteSingleLabel();
//     deleteLabel(octokit, userInfo, targetLabel);
//     break;
//   }
//   case 3: {
//     deleteLabels(octokit, userInfo);
//     break;
//   }
//   default: {
//     console.log('invalid input');
//     break;
//   }
// }


readlineSync.promptCLLoop({
  set: () => {
    setupInfo();
    console.log(userInfo);
    console.log(octokit);
  },
  c_single: () => {
    // create a single label
    const newLabel = createSingleLabel();
    void createLabel(octokit, userInfo, newLabel);
  },
  c_multi: () => {
    // create multiple labels
    createLabels(octokit, userInfo);
  },
  d_single: () => {
    // delete a single label
    const targetLabel = deleteSingleLabel();
    deleteLabel(octokit, userInfo, targetLabel);
  },
  d_all: () => {
    // delete all labels
    deleteLabels(octokit, userInfo);
  },
  bye: () => {
    return true;
  },
});
console.log('bye 👋');
