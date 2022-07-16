const isFieldEmpties = (fields) => {
  const filteredKeys = Object.keys(fields).filter(
    (key) => fields[key] == "" || fields[key] == undefined
  );

  return filteredKeys;
};

const isFieldEmptiesWithComments = (fields) => {
  const keys = Object.keys(fields);
  const filteredKeys = keys.filter((key) => {
    return fields[key] == "" || fields[key] == undefined;
  });

  return filteredKeys;
};

module.exports = {isFieldEmpties};
