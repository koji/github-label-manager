import prompts from 'prompts';

import { jsonFilePath } from '../constant.js';

export const getJsonFilePath = async (): Promise<string> => {
    const response = await prompts(jsonFilePath);
    return response.filePath;
};