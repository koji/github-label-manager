import prompts from 'prompts';

import { deleteLabel } from '../constant';

export const getTargetLabel = async (): Promise<string[]> => {
  const response = await prompts(deleteLabel);
  // console.log('resp', response);
  return [response.name];
}
