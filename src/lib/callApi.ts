// call api
// create a label/labels
// delete a label/labels

import { extraGuideText, labels } from '../constant';
import { ConfigType, CreateLabelResponseType, ImportLabelType } from '../types';

export const createLabel = async (
  configs: ConfigType,
  label: ImportLabelType
) => {
  const resp = await configs.octokit.request(
    'POST /repos/{owner}/{repo}/labels',
    {
      owner: configs.owner,
      repo: configs.repo,
      name: label.name,
      color: label.color,
      description: label.description,
    }
  );

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

export const createLabels = async (configs: ConfigType) => {
  labels.forEach(async (label) => {
    createLabel(configs, label);
  });
  console.log('Created all labels');
  console.log(extraGuideText);
};

export const deleteLabel = (
  configs: ConfigType,
  labelNames: readonly string[]
) => {
  labelNames.forEach(async (labelName: string) => {
    await configs.octokit.request(
      'DELETE /repos/{owner}/{repo}/labels/{name}',
      {
        owner: configs.owner,
        repo: configs.repo,
        name: labelName,
      }
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
    }
  );

  if (resp.status === 200) {
    const names = await resp.data.map((label) => label.name);
    return names;
  } else {
    console.log('something wrong');
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
      }
    );
  });
  console.log('');
  names.forEach((label: string) => console.log(`deleted ${label}`));
  console.log(extraGuideText);
};
