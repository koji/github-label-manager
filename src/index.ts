import { Octokit } from '@octokit/core';

import {
  createLabel,
  createLabels,
  deleteLabel,
  deleteLabels,
} from './lib/callApi';
import { AsciiText } from './lib/displayAsciiText';
import { getTargetLabel } from './lib/inputDeleteLabel';
import { getGitHubConfigs } from './lib/inputGitHubConfig';
import { getNewLabel } from './lib/inputNewLabel';
import { selectAction } from './lib/selectPrompts';
import { ConfigType } from './types';

// set up configs to access GitHub repo
const setupConfigs = async () => {
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

const main = async () => {
  console.log(AsciiText);
  const configs: ConfigType = await setupConfigs();
  let selectedIndex = await selectAction();
  while (selectedIndex == 99) {
    selectedIndex = await selectAction();
  }

  switch (selectedIndex) {
    case 0: {
      const newLabel = await getNewLabel();
      createLabel(configs, newLabel);
      break;
    }

    case 1: {
      console.log('create labels');
      createLabels(configs);
      break;
    }

    case 2: {
      console.log('delete a label');
      const targetLabel = await getTargetLabel();
      deleteLabel(configs, targetLabel);
      break;
    }

    case 3: {
      // console.log('delete all labels');
      deleteLabels(configs);
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
};

main();
