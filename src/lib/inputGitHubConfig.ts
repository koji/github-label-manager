import { Octokit } from '@octokit/core';
import prompts from 'prompts';

import { githubConfigs } from '../constant.js';
import { ConfigType } from '../types/index.js';

import { ConfigError, ConfigManager } from './configManager.js';

export const getGitHubConfigs = async (): Promise<ConfigType> => {
  const configManager = new ConfigManager();

  // Try to load and validate existing configuration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let validationResult: any = {
    config: null,
    shouldPromptForCredentials: true,
    preservedData: undefined
  };
  try {
    const result = await configManager.loadValidatedConfig();
    if (result) {
      validationResult = result;
    }
  } catch {
    // Configuration loading errors are already handled and logged in ConfigManager
    // We just continue with prompting for new credentials
    validationResult = {
      config: null,
      shouldPromptForCredentials: true,
      preservedData: undefined
    };
  }

  if (validationResult.config && !validationResult.shouldPromptForCredentials) {
    // We have valid saved config, but we still need to prompt for repo
    const repoResponse = await prompts([
      {
        type: 'text',
        name: 'repo',
        message: 'Please type your target repo name',
      },
    ]);

    const octokit = new Octokit({
      auth: validationResult.config.token,
    });

    return {
      octokit,
      owner: validationResult.config.owner,
      repo: repoResponse.repo,
      fromSavedConfig: true,
    };
  }

  // No saved config or invalid config, prompt for credentials
  const promptConfig = [...githubConfigs];

  // If we have preserved data (like a valid owner), pre-fill it
  if (validationResult.preservedData?.owner) {
    const ownerPromptIndex = promptConfig.findIndex(
      (prompt) => prompt.name === 'owner',
    );
    if (ownerPromptIndex !== -1) {
      promptConfig[ownerPromptIndex] = {
        ...promptConfig[ownerPromptIndex],
        initial: validationResult.preservedData.owner,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any; // Type assertion for prompts with initial value
    }
  }

  const response = await prompts(promptConfig);

  // Save the new configuration for future use
  if (response.octokit && response.owner) {
    try {
      await configManager.saveConfig({
        token: response.octokit,
        owner: response.owner,
        lastUpdated: new Date().toISOString(),
      });

      if (
        validationResult.preservedData?.owner &&
        validationResult.preservedData.owner !== response.owner
      ) {
        console.log('✓ Configuration updated with new credentials');
      } else {
        console.log('✓ Configuration saved successfully');
      }
    } catch (error) {
      if (error instanceof ConfigError) {
        console.error(`❌ ${ConfigManager.getErrorMessage(error)}`);

        if (!ConfigManager.isRecoverableError(error)) {
          console.error(
            '   This may affect future sessions. Please resolve the issue or contact support.',
          );
        }
      } else {
        console.warn(
          '⚠️  Failed to save configuration:',
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    }
  }

  // Create Octokit instance and return config
  const octokit = new Octokit({
    auth: response.octokit,
  });

  return {
    octokit,
    owner: response.owner,
    repo: response.repo,
    fromSavedConfig: false,
  };
};
