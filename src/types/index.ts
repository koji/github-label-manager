export type ImportLabelType = {
  // eslint-disable-next-line functional/prefer-readonly-type
  name: string;
  // eslint-disable-next-line functional/prefer-readonly-type
  color?: string;
  // eslint-disable-next-line functional/prefer-readonly-type
  description?: string;
};

export type LabelType = ImportLabelType & {
  readonly id: number;
  readonly node_id: string;
  readonly url: string;
  readonly default: boolean;
};

export type CreateLabelResponseType = 201 | 404 | 422;
