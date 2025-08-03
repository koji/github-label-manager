# Requirements Document

## Introduction

この機能は、GitHub Label ManagerツールにJSONファイルからラベルをインポートする機能を追加します。ユーザーが事前に定義したJSONファイルを指定することで、複数のラベルを一括でGitHubリポジトリに作成できるようになります。これにより、プロジェクト間でのラベル設定の標準化や、バックアップからの復元が容易になります。

## Requirements

### Requirement 1

**User Story:** As a GitHub repository maintainer, I want to import labels from a JSON file, so that I can quickly set up standardized labels across multiple repositories.

#### Acceptance Criteria

1. WHEN the user selects the main menu THEN the system SHALL display "import JSON" as a new menu option
2. WHEN the user selects "import JSON" THEN the system SHALL prompt for a JSON file path
3. WHEN a valid JSON file path is provided THEN the system SHALL read and parse the JSON file
4. WHEN the JSON file contains valid label data THEN the system SHALL create all labels using the existing createLabels functionality

### Requirement 2

**User Story:** As a user, I want the system to validate the JSON file format, so that I can be confident the import will work correctly.

#### Acceptance Criteria

1. WHEN the JSON file is not found THEN the system SHALL display an error message and return to the main menu
2. WHEN the JSON file contains invalid JSON syntax THEN the system SHALL display a parsing error message
3. WHEN the JSON file does not contain an array of label objects THEN the system SHALL display a format validation error
4. WHEN a label object is missing required fields THEN the system SHALL display a validation error specifying which fields are missing

### Requirement 3

**User Story:** As a user, I want to see the progress of label creation, so that I can monitor the import process.

#### Acceptance Criteria

1. WHEN the import process starts THEN the system SHALL display the number of labels to be imported
2. WHEN each label is created successfully THEN the system SHALL display a success message with the label name
3. WHEN all labels are processed THEN the system SHALL display a completion message
4. WHEN the import process encounters errors THEN the system SHALL continue processing remaining labels and report errors

### Requirement 4

**User Story:** As a user, I want the JSON format to match the expected label structure, so that I can easily create compatible JSON files.

#### Acceptance Criteria

1. WHEN importing labels THEN the system SHALL accept JSON files with an array of objects containing name, color, and description fields
2. WHEN a label object has a name field THEN the system SHALL treat it as required
3. WHEN a label object has color and description fields THEN the system SHALL treat them as optional
4. WHEN color field is provided without "#" prefix THEN the system SHALL accept it as valid