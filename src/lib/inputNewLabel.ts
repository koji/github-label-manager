import prompts from 'prompts';

import { newLabel } from '../constant';
import { ImportLabelType } from '../types';

export const getNewLabel = async (): Promise<ImportLabelType> => {
  const response = await prompts(newLabel);
  // console.log(response);
  return response;
};
