import readlineSync from 'readline-sync';

export const deleteSingleLabel = () => {
  // delete a single label
  const labelName = readlineSync.question(
    'Please type label name you want to delete '
  );
  return [labelName];
};
