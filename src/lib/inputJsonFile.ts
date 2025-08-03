import prompts from 'prompts';

import { jsonFilePath } from '../constant';

export const getJsonFilePath = async (): Promise<string> => {
    const response = await prompts(jsonFilePath);
    return response.filePath;
};