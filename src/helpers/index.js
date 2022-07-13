const isFieldEmpties = (fields) => {
  const filteredKeys = Object.keys(fields).filter(
    (key) => fields[key] == "" || fields[key] == undefined
  );

  return filteredKeys; // ['username']
};

const isFieldEmptiesWithComments = (fields) => {
  // fields : {username: "", password: "password", image: undefined}
  // keys : [ 'username', 'password', 'image' ]
  const keys = Object.keys(fields);
  // filteredKeys : [ 'username', 'image' ]
  const filteredKeys = keys.filter((key) => {
    // key : 'image'
    // fields['image']
    // false or true --> true
    return fields[key] == "" || fields[key] == undefined;
  });

  //   ['username']
  return filteredKeys;

  //   console.log("username:", fields["username"]);
  //   console.log("username:", fields.username);
};

module.exports = {isFieldEmpties};
