// call api
// create a label/labels
// delete a label/labels

import { CreateLabelResponseType, ImportLabelType, UserInfoType } from '../types';
import { labels } from '../label';

export const createLabel = async (octokit: any, userInfo: UserInfoType, label: ImportLabelType) => {
  const resp = await octokit.request('POST /repos/{owner}/{repo}/labels', {
    owner: userInfo.owner,
    repo: userInfo.repo,
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

export const createLabels = async (octokit: any, userInfo: UserInfoType) => {
  labels.forEach(async (label) => {
    createLabel(octokit, userInfo, label);
  });
  console.log('Created all labels');
};

export const deleteLabel = (octokit: any, userInfo: UserInfoType, labelNames: readonly string[]) => {
  labelNames.forEach(async (labelName: string) => {
    await octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: userInfo.owner,
      repo: userInfo.repo,
      name: labelName,
    });
  });
};

// get labels
const getLabels = async (octokit: any, userInfo: UserInfoType) => {
  const resp = await octokit.request('GET /repos/{owner}/{repo}/labels', {
    owner: userInfo.owner,
    repo: userInfo.repo,
  });

  if (resp.status === 200) {
    const names = await resp.data.map((label) => label.name);
    return names;
  } else {
    console.log('something wrong');
    return [];
  }
};

export const deleteLabels = async (octokit: any, userInfo: UserInfoType) => {
  // get all labels
  const names = await getLabels(octokit, userInfo);
  names.forEach(async (name: string) => {
    await octokit.request('DELETE /repos/{owner}/{repo}/labels/{name}', {
      owner: userInfo.owner,
      repo: userInfo.repo,
      name: name,
    });
  });
  names.forEach((label: string) => console.log(`deleted ${label}`));
};