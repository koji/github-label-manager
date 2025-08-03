import prompts from 'prompts';

import { githubConfigs } from '../constant.js';
import { ConfigType } from '../types/index.js';

export const getGitHubConfigs = async (): Promise<ConfigType> => {
  const response = await prompts(githubConfigs);
  // console.log(response);
  return response;
};
