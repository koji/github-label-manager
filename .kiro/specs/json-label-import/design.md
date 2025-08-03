# Design Document

## Overview

この機能は、既存のGitHub Label Managerツールに新しいメニューオプション「import JSON」を追加し、JSONファイルからラベルデータを読み込んで一括作成する機能を実装します。既存のアーキテクチャとコードスタイルを維持しながら、最小限の変更で機能を追加します。

## Architecture

既存のツールは以下の構造を持っています：
- `src/index.ts`: メインエントリーポイントとメニュー処理
- `src/lib/callApi.ts`: GitHub API呼び出し機能
- `src/lib/selectPrompts.ts`: メニュー選択処理
- `src/constant.ts`: 定数とメニュー定義
- `src/types/index.ts`: 型定義

新機能は既存の構造に以下を追加します：
- メニューオプションの追加（case 5として）
- JSONファイル読み込み機能
- ファイルパス入力プロンプト
- JSON検証機能

## Components and Interfaces

### 1. Menu Extension
- `src/constant.ts`の`actionSelector`に新しいオプション「import JSON」を追加
- `src/index.ts`のswitch文にcase 5を追加

### 2. JSON File Input Handler
新しいファイル: `src/lib/inputJsonFile.ts`
```typescript
export const getJsonFilePath = async (): Promise<string>
```
- ユーザーからJSONファイルパスの入力を受け取る
- promptsライブラリを使用して既存のUIパターンに合わせる

### 3. JSON Import Handler  
新しいファイル: `src/lib/importJson.ts`
```typescript
export const importLabelsFromJson = async (configs: ConfigType, filePath: string): Promise<void>
```
- JSONファイルの読み込み
- JSON形式の検証
- ラベルデータの検証
- 既存の`createLabel`関数を使用してラベル作成

### 4. Type Extensions
既存の`ImportLabelType`を使用（追加の型定義は不要）

## Data Models

### JSON File Format
期待されるJSONファイル形式：
```json
[
  {
    "name": "Type: Bug Fix",
    "color": "FF8A65",
    "description": "Fix features that are not working"
  },
  {
    "name": "Type: Enhancement", 
    "color": "64B5F7",
    "description": "Add new features"
  }
]
```

### Validation Rules
- ファイルは有効なJSONである必要がある
- ルート要素は配列である必要がある
- 各オブジェクトは`name`フィールドを持つ必要がある
- `color`と`description`はオプション
- `color`フィールドは"#"プレフィックスなしで受け入れる

## Error Handling

### File System Errors
- ファイルが存在しない場合: エラーメッセージを表示してメインメニューに戻る
- ファイル読み込み権限エラー: 適切なエラーメッセージを表示

### JSON Parsing Errors  
- 無効なJSON構文: パースエラーメッセージを表示
- 予期しないデータ構造: 形式検証エラーメッセージを表示

### Label Creation Errors
- 既存の`createLabel`関数のエラーハンドリングを活用
- 個別のラベル作成エラーが発生しても処理を継続
- 最終的に成功/失敗の概要を表示

## Testing Strategy

### Unit Testing Areas
1. JSON file reading and parsing
2. Label data validation
3. Error handling for various failure scenarios
4. Integration with existing createLabel functionality

### Integration Testing
1. End-to-end flow from menu selection to label creation
2. Error recovery and user experience
3. Compatibility with existing menu system

### Test Data
- Valid JSON files with various label configurations
- Invalid JSON files for error testing
- Edge cases (empty arrays, missing fields, etc.)

## Implementation Notes

### Code Style Consistency
- 既存のコードスタイルに合わせる（async/await、chalk for coloring、console.log for output）
- 既存のプロンプトパターンに従う
- エラーメッセージは既存のものと一貫性を保つ

### Dependencies
- 新しい依存関係は追加しない
- Node.jsの標準`fs`モジュールを使用してファイル読み込み
- 既存の`prompts`ライブラリを使用してユーザー入力

### Performance Considerations
- 大きなJSONファイルでも適切に処理できるよう、ストリーミング読み込みは不要（通常のラベルファイルは小さい）
- ラベル作成は既存の実装に従い、順次処理