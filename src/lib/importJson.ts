import * as fs from 'fs';

import chalk from 'chalk';

import { ConfigType, ImportLabelType } from '../types/index.js';

import { createLabel } from './callApi.js';

const log = console.log;

export const importLabelsFromJson = async (
  configs: ConfigType,
  filePath: string,
): Promise<void> => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      log(chalk.red(`Error: File not found at path: ${filePath}`));
      return;
    }

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse JSON
    let jsonData: unknown;
    try {
      jsonData = JSON.parse(fileContent);
    } catch (parseError) {
      log(chalk.red(`Error: Invalid JSON syntax in file: ${filePath}`));
      log(
        chalk.red(
          `Parse error: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        ),
      );
      return;
    }

    // Validate JSON structure (must be array)
    if (!Array.isArray(jsonData)) {
      log(chalk.red('Error: JSON file must contain an array of label objects'));
      return;
    }

    // Validate each label object
    const validLabels: ImportLabelType[] = [];
    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];

      // Check if item is an object
      if (typeof item !== 'object' || item === null) {
        log(chalk.red(`Error: Item at index ${i} is not a valid object`));
        continue;
      }

      const labelObj = item as Record<string, unknown>;

      // Validate required name field
      if (!labelObj.name) {
        log(
          chalk.red(
            `Error: Item at index ${i} is missing required 'name' field`,
          ),
        );
        continue;
      }
      if (typeof labelObj.name !== 'string') {
        log(
          chalk.red(
            `Error: Item at index ${i} has invalid 'name' field (must be a non-empty string)`,
          ),
        );
        continue;
      }
      if (labelObj.name.trim() === '') {
        log(
          chalk.red(
            `Error: Item at index ${i} has empty 'name' field (name cannot be empty)`,
          ),
        );
        continue;
      }

      // Validate optional color field
      if (labelObj.color !== undefined) {
        if (typeof labelObj.color !== 'string') {
          log(
            chalk.red(
              `Error: Item at index ${i} has invalid 'color' field (must be a string)`,
            ),
          );
          continue;
        }
        if (labelObj.color.trim() === '') {
          log(
            chalk.red(
              `Error: Item at index ${i} has empty 'color' field (color cannot be empty if provided)`,
            ),
          );
          continue;
        }
      }

      // Validate optional description field
      if (labelObj.description !== undefined) {
        if (typeof labelObj.description !== 'string') {
          log(
            chalk.red(
              `Error: Item at index ${i} has invalid 'description' field (must be a string)`,
            ),
          );
          continue;
        }
        // Note: Empty description is allowed as it's a valid use case
      }

      // Check for unknown fields and warn user
      const knownFields = ['name', 'color', 'description'];
      const unknownFields = Object.keys(labelObj).filter(
        (key) => !knownFields.includes(key),
      );
      if (unknownFields.length > 0) {
        log(
          chalk.yellow(
            `Warning: Item at index ${i} contains unknown fields that will be ignored: ${unknownFields.join(', ')}`,
          ),
        );
      }

      // Create valid label object
      const validLabel: ImportLabelType = {
        name: (labelObj.name as string).trim(),
        ...(labelObj.color !== undefined && {
          color: (labelObj.color as string).trim(),
        }),
        ...(labelObj.description !== undefined && {
          description: labelObj.description as string,
        }),
      };

      validLabels.push(validLabel);
    }

    // Check if we have any valid labels to import
    if (validLabels.length === 0) {
      log(chalk.red('Error: No valid labels found in JSON file'));
      return;
    }

    // Display number of labels to be imported
    log(chalk.blue(`Starting import of ${validLabels.length} labels...`));
    log(''); // Empty line for better readability

    // Import each label using existing createLabel function with progress reporting
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < validLabels.length; i++) {
      const label = validLabels[i];
      const progress = `[${i + 1}/${validLabels.length}]`;

      try {
        log(chalk.cyan(`${progress} Processing: ${label.name}`));
        await createLabel(configs, label);
        successCount++;
      } catch (error) {
        errorCount++;
        log(
          chalk.red(
            `${progress} Failed to create label "${label.name}": ${error instanceof Error ? error.message : 'Unknown error'}`,
          ),
        );
        // Continue processing remaining labels
      }
    }

    // Display completion message with summary
    log(''); // Empty line for better readability
    if (errorCount === 0) {
      log(
        chalk.green(
          `✅ Import completed successfully! Created ${successCount} labels.`,
        ),
      );
    } else {
      log(chalk.yellow(`⚠️  Import completed with some errors:`));
      log(chalk.green(`  • Successfully created: ${successCount} labels`));
      log(chalk.red(`  • Failed to create: ${errorCount} labels`));
      log(chalk.blue(`  • Total processed: ${validLabels.length} labels`));
    }
  } catch (error) {
    log(
      chalk.red(
        `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ),
    );
  }
};
