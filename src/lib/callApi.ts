// call api
// create a label/labels
// delete a label/labels

import chalk from 'chalk';

import { extraGuideText, labels } from '../constant.js';
import { ConfigType, CreateLabelResponseType, ImportLabelType } from '../types/index.js';
const log = console.log;

export const createLabel = async (
  configs: ConfigType,
  label: ImportLabelType,
) => {
  const resp = await configs.octokit.request(
    'POST /repos/{owner}/{repo}/labels',
    {
      owner: configs.owner,
      repo: configs.repo,
      name: label.name,
      color: label.color,
      description: label.description,
    },
  );

  const status = resp.status as CreateLabelResponseType;

  switch (status) {
    case 201:
      log(chalk.green(`${resp.status}: Created ${label.name}`));
      break;
    case 404:
      log(chalk.red(`${resp.status}: Resource not found`));
      break;
    case 422:
      log(chalk.red(`${resp.status}: Validation failed`));
      break;
    default:
      log(chalk.yellow(`${resp.status}: Something wrong`));
      break;
  }
};

export const createLabels = async (configs: ConfigType) => {
  labels.forEach(async (label) => {
    createLabel(configs, label);
  });
  log('Created all labels');
  log(chalk.bgBlueBright(extraGuideText));
};

export const deleteLabel = (
  configs: ConfigType,
  labelNames: readonly string[],
) => {
  labelNames.forEach(async (labelName: string) => {
    await configs.octokit.request(
      'DELETE /repos/{owner}/{repo}/labels/{name}',
      {
        owner: configs.owner,
        repo: configs.repo,
        name: labelName,
      },
    );
  });
};

// get labels
const getLabels = async (configs: ConfigType): Promise<readonly string[]> => {
  const resp = await configs.octokit.request(
    'GET /repos/{owner}/{repo}/labels',
    {
      owner: configs.owner,
      repo: configs.repo,
    },
  );

  if (resp.status === 200) {
    const names = await resp.data.map((label) => label.name);
    return names;
  } else {
    log(chalk.red('something wrong'));
    return [];
  }
};

export const deleteLabels = async (configs: ConfigType) => {
  // get all labels
  const names = await getLabels(configs);
  names.forEach(async (name: string) => {
    await configs.octokit.request(
      'DELETE /repos/{owner}/{repo}/labels/{name}',
      {
        owner: configs.owner,
        repo: configs.repo,
        name: name,
      },
    );
  });
  log('');
  names.forEach((label: string) => log(chalk.bgGreen(`deleted ${label}`)));
  log(chalk.bgBlueBright(extraGuideText));
};
