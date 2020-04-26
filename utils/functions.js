export const toTimestamp = strDate => {
  return Date.parse(strDate);
};
export const toTimestring = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};
