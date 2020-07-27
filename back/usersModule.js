const jsonFile = require('jsonfile');
const jsonFle = jsonFile.readFile('users.json');

exports.readAll = async () => {
  const fileData = await jsonFle;
  return fileData;
};

exports.readById = async id => {
  const fileData = await jsonFile.readFile('./users.json');
  const item = fileData.filter(ele => ele.id == id);
  return item;
};

exports.addUser = async user => {
  try {
    const currentFileData = await jsonFile.readFile('users.json');
    currentFileData.push(user);

    const updateFile = await jsonFile.writeFile('users.json', currentFileData);
    return user;
  } catch (err) {
    console.log(`err`);
  }
};

exports.updateUser = async (id, prop, val) => {
  const currentFileData = await jsonFile.readFile('users.json');
  const editedItemIndex = currentFileData.findIndex(ele => ele.id == id);
  const editedItem = currentFileData[editedItemIndex];
  editedItem[prop] = val;
  currentFileData[editedItemIndex] = editedItem;
  const updateFile = await jsonFile.writeFile('users.json', currentFileData);
  return editedItem;
};

exports.deleteUserById = async id => {
  let currentFileData = await jsonFile.readFile('users.json');
  currentFileData = currentFileData.filter(element => element.id != id);
  const updatedFile = await jsonFile.writeFile('users.json', currentFileData);
  return {};
};
