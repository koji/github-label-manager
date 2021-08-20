import { Octokit } from '@octokit/core';
import readlineSync from 'readline-sync';

import { labels } from './label';
import { CreateLabelResponseType, ImportLabelType } from './types';

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

const createLabel = async (label: ImportLabelType) => {
  const resp = await octokit.request('POST /repos/{owner}/{repo}/labels', {
    owner: owner,
    repo: repo,
    name: label.name,
    color: label.color,
    description: label.description,
  });

  const status = resp.status as CreateLabelResponseType;

  switch (status) {
    case 201:
      console.log(`${resp.status}: Created ${label.name}`);
      break;
    case 404:
      console.log(`${resp.status}: Resource not found`);
      break;
    case 422:
      console.log(`${resp.status}: Validation failed`);
      break;
    default:
      console.log(`${resp.status}: Something wrong`);
      break;
  }
};

const createSingleLabel = async () => {
  const labelName = readlineSync.question('Please type new label name ');
  const labelColor = readlineSync.question(
    "Please type label color without '#' "
  );
  const labelDescription = readlineSync.question(
    'Please type label description '
  );
  const label = {
    name: labelName,
    color: labelColor,
    description: labelDescription,
  };
  createLabel(label);
};

const createMultipleLabels = async () => {
  labels.forEach(async (label) => {
    createLabel(label);
  });
  console.log('Created all labels');
};

const deleteSingleLabel = async () => {
  // delete a single label
  const labelName = readlineSync.question(
    'Please type label name you want to delete '
  );
  await octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
    owner: owner,
    repo: repo,
    name: labelName,
  });
  console.log(`deleted ${labelName}`);
};

// get all default labels
const getLabels = async () => {
  const resp = await octokit.request('GET /repos/{owner}/{repo}/labels', {
    owner: owner,
    repo: repo,
  });

  if (resp.status === 200) {
    const names = await resp.data.map((label) => label.name);
    return names;
  } else {
    console.log('something wrong');
    return [];
  }
};

const deleteAllLabels = async () => {
  // get all labels
  const names = await getLabels();
  names.forEach(async (name: string) => {
    await octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: owner,
      repo: repo,
      name: name,
    });
  });
  names.forEach((label: string) => console.log(`deleted ${label}`));
};

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

switch (selectedTypeIndex) {
  case 0:
    createSingleLabel();
    break;
  case 1:
    createMultipleLabels();
    break;
  case 2:
    deleteSingleLabel();
    break;
  case 3:
    deleteAllLabels();
    break;
  default:
    console.log('invalid input');
    break;
}
