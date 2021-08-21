import { Octokit } from '@octokit/core';
import readlineSync from 'readline-sync';
import { createSingleLabel } from './lib/createSingleLabel';
import { deleteSingleLabel } from './lib/deleteSingleLabel';
import { createLabel, deleteLabel, createLabels, deleteLabels } from './lib/callApi';
import { AsciiText } from './lib/displayAscii';
// import { initialDescription } from './constant';
import readline from 'readline';

let owner: string;
let repo: string;
let octokit: any;
const basicConfig = {
  octokit: octokit,
  owner: owner,
  repo: repo,
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const setupInfo = () => {
  const githubToken = readlineSync.question('Github token: ', {hideEchoBack: true,});
  octokit = new Octokit({
    auth: `${githubToken}`,
  });
  basicConfig.octokit = octokit;
  basicConfig.owner = readlineSync.question('Please type your GitHub account ');
  basicConfig.repo = readlineSync.question('Please type your target repo name ');
}


const recursiveAsyncReadLine = () => {
  rl.question(
    "Please Choose an option:\n" +
      "1) set info\n" +
      "2) create a label\n" +
      "3) create labels\n" +
      "4) delete a label\n" +
      "5) delete labels\n" +
      "6) Exit\n",
    function (line: string) {
      switch (line) {
        case "1":
          // console.log("set info");
          setupInfo();
          // console.log(userInfo);
          // console.log(octokit);
          break;

        case "2":
          // console.log("create a label");
          if(basicConfig.octokit && basicConfig.owner.length>0 && basicConfig.repo.length>0) {
            const newLabel = createSingleLabel();
            createLabel(basicConfig, newLabel);
          } else {
            console.log('Please set info before try this!');
          }
          break;

        case "3":
          // console.log("create labels");
          if(basicConfig.octokit && basicConfig.owner.length>0 && basicConfig.repo.length>0) {
            createLabels(basicConfig);
          } else {
            console.log('Please set info before try this!');
          }
          break;

        case "4":
          // console.log("delete a label");
          if(basicConfig.octokit && basicConfig.owner.length>0 && basicConfig.repo.length>0) {
            const targetLabel = deleteSingleLabel();
            deleteLabel(basicConfig, targetLabel);
          } else {
            console.log('Please set info before try this!');
          }
          break;

        case "5":
          // console.log("delete labels");
          if(basicConfig.octokit && basicConfig.owner.length>0 && basicConfig.repo.length>0) {
            deleteLabels(basicConfig);
          } else {
            console.log('Please set info before try this!');
          }
          break;

        case "6":
          // console.log('bye 👋');
          return rl.close();
          break;
        default:
          console.log("No such option 🤔 Please enter another: ");
      }
      recursiveAsyncReadLine(); //Calling this function again to ask new question
    }
  );
};

console.log(AsciiText);
// console.log(initialDescription);
recursiveAsyncReadLine();


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


/*
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
*/
