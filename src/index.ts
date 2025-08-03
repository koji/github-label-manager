import { Octokit } from '@octokit/core';
import chalk from 'chalk';

import { AsciiText, initialText, linkToPersonalToken } from './constant';
import {
  createLabel,
  createLabels,
  deleteLabel,
  deleteLabels,
} from './lib/callApi';
import { getConfirmation } from './lib/confirmToken';
import { importLabelsFromJson } from './lib/importJson';
import { getTargetLabel } from './lib/inputDeleteLabel';
import { getGitHubConfigs } from './lib/inputGitHubConfig';
import { getJsonFilePath } from './lib/inputJsonFile';
import { getNewLabel } from './lib/inputNewLabel';
import { selectAction } from './lib/selectPrompts';
import { ConfigType } from './types';
const log = console.log;

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
  const confirmation = await getConfirmation();
  if (!confirmation) {
    log(
      chalk.redBright(
        `Please go to ${linkToPersonalToken} and generate a personal token!`,
      ),
    );
    return;
  }

  if (firstStart) {
    log(AsciiText);
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
      try {
        const filePath = await getJsonFilePath();
        if (filePath) {
          await importLabelsFromJson(configs, filePath);
        } else {
          log(chalk.yellow('No file path provided. Returning to main menu.'));
        }
      } catch (error) {
        log(chalk.red(`Error during JSON import: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
      firstStart = firstStart && false;
      break;
    }

    case 5: {
      console.log('exit');
      process.exit(0);
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
