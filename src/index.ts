import { Octokit } from '@octokit/core';

import { AsciiText, initialText } from './constant';
import {
  createLabel,
  createLabels,
  deleteLabel,
  deleteLabels,
} from './lib/callApi';
import { getTargetLabel } from './lib/inputDeleteLabel';
import { getGitHubConfigs } from './lib/inputGitHubConfig';
import { getNewLabel } from './lib/inputNewLabel';
import { selectAction } from './lib/selectPrompts';
import { ConfigType } from './types';

let firstStart = true;
// set up configs to access GitHub repo
const setupConfigs = async () => {
  console.log(initialText);
  const resp = await getGitHubConfigs();
  const octokit = new Octokit({
    auth: `${resp.octokit}`,
  });
  return {
    octokit,
    owner: resp.owner,
    repo: resp.repo,
  };
};

// steps
// first call setupConfigs
let configs: ConfigType;
const main = async () => {
  if (firstStart) {
    console.log(AsciiText);
    configs = await setupConfigs();
  }

  let selectedIndex = await selectAction();
  while (selectedIndex == 99) {
    selectedIndex = await selectAction();
  }

  switch (selectedIndex) {
    case 0: {
      const newLabel = await getNewLabel();
      createLabel(configs, newLabel);
      firstStart = firstStart && false;
      break;
    }

    case 1: {
      // console.log('create labels');
      createLabels(configs);
      firstStart = firstStart && false;
      break;
    }

    case 2: {
      // console.log('delete a label');
      const targetLabel = await getTargetLabel();
      deleteLabel(configs, targetLabel);
      firstStart = firstStart && false;
      break;
    }

    case 3: {
      // console.log('delete all labels');
      deleteLabels(configs);
      firstStart = firstStart && false;
      break;
    }
    case 4: {
      console.log('exit');
      process.exit(1);
      // deleteLabels(octokit, userInfo);
      break;
    }
    default: {
      console.log('invalid input');
      break;
    }
  }
  main();
};

main();
