// call api
// create a label/labels
// delete a label/labels

import { CreateLabelResponseType, ImportLabelType, ConfigType } from '../types';
import { labels } from '../data';

export const createLabel = async (config: ConfigType, label: ImportLabelType) => {
  const resp = await config.octokit.request('POST /repos/{owner}/{repo}/labels', {
    owner: config.owner,
    repo: config.repo,
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

export const createLabels = async (config: ConfigType) => {
  labels.forEach(async (label) => {
    createLabel(config, label);
  });
  console.log('Created all labels');
};

export const deleteLabel = (config: ConfigType, labelNames: readonly string[]) => {
  labelNames.forEach(async (labelName: string) => {
    await config.octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: config.owner,
      repo: config.repo,
      name: labelName,
    });
  });
};

// get labels
const getLabels = async (config: ConfigType) => {
  const resp = await config.octokit.request('GET /repos/{owner}/{repo}/labels', {
    owner: config.owner,
    repo: config.repo,
  });

  if (resp.status === 200) {
    const names = await resp.data.map((label) => label.name);
    return names;
  } else {
    console.log('something wrong');
    return [];
  }
};

export const deleteLabels = async (config: ConfigType) => {
  // get all labels
  const names = await getLabels(config);
  names.forEach(async (name: string) => {
    await config.octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: config.owner,
      repo: config.repo,
      name: name,
    });
  });
  names.forEach((label: string) => console.log(`deleted ${label}`));
};