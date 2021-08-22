import prompts from 'prompts';

import { githubConfigs } from '../constant';
import { ConfigType } from '../types';

export const getGitHubConfigs = async (): Promise<ConfigType> => {
  const response = await prompts(githubConfigs);
  // console.log(response);
  return response;
};
