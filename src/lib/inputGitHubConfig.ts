import prompts from 'prompts';

import { githubConfigs } from '../constant';

export const getGitHubConfigs = async (): prompts.Prompts => {
  const response = await prompts(githubConfigs);
  // console.log(response);
  return response;
};
