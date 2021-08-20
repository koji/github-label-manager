import { Octokit } from '@octokit/core';
import readlineSync from 'readline-sync';

// import { labels } from './label';
import { createSingleLabel } from './lib/createSingleLabel';
import { deleteSingleLabel } from './lib/deleteSingleLabel';

import { createLabel, deleteLabel, createLabels, deleteLabels } from './lib/callApi';

// cancel: -1, single: 0, multi: 1, delete label"2, delete all labels: 3
const labelCreationType = [
  'single label',
  'multiple labels',
  'delete label',
  'delete all labels',
];
const selectedTypeIndex = readlineSync.keyInSelect(
  labelCreationType,
  'Create a single label or multiple labels from json'
);
// console.log(selectedTypeIndex);
if (selectedTypeIndex === -1) {
  console.log('Canceled');
  process.exit(1);
}

// const createMultipleLabels = async () => {
//   labels.forEach(async (label) => {
//     createLabel(label);
//   });
//   console.log('Created all labels');
// };


// get information to access github api for managing labels
const githubToken = readlineSync.question('Github token: ', {
  hideEchoBack: true,
});
const octokit = new Octokit({
  auth: `${githubToken}`,
});
// input owner and repo name
const owner = readlineSync.question('Please type your GitHub account ');
const repo = readlineSync.question('Please type your target repo name ');
const userInfo = {
  owner: owner,
  repo: repo,
};

switch (selectedTypeIndex) {
  case 0: {
    const newLabel = createSingleLabel();
    createLabel(octokit, userInfo, newLabel);
    break;
  }
  case 1: {
    createLabels(octokit, userInfo);
    // console.log('create multiple labels');
    break;
  }
  case 2: {
    const targetLabel = deleteSingleLabel();
    deleteLabel(octokit, userInfo, targetLabel);
    break;
  }
  case 3: {
    deleteLabels(octokit, userInfo);
    break;
  }
  default: {
    console.log('invalid input');
    break;
  }
}
