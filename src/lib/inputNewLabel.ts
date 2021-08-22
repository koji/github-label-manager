import prompts from 'prompts';

import { newLabel } from '../constant';

export const getNewLabel = async() => {
  const response = await prompts(newLabel);
  // console.log(response);
  return response;  
}
