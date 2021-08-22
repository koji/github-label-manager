import prompts from 'prompts';

import { deleteLabel } from '../constant';

(async () => {
  const response = await prompts(deleteLabel);
  console.log(response);
})();
