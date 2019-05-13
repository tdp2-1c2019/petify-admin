export const snapshotToArray = usersSnapshot => {
  const object = usersSnapshot.val();
  const array = [];
  for (const fbid of Object.keys(object)) {
    array.push({fbid, ...object[fbid]});
  }
  return array;
};
