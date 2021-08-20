import readlineSync from 'readline-sync';

import { ImportLabelType } from '../types';

export const createSingleLabel = () => {
  const labelName = readlineSync.question('Please type new label name ');
  const labelColor = readlineSync.question(
    "Please type label color without '#' "
  );
  const labelDescription = readlineSync.question(
    'Please type label description '
  );
  const label: ImportLabelType = {
    name: labelName,
    color: labelColor,
    description: labelDescription,
  };
  return label;
  // createLabel(label);
};
