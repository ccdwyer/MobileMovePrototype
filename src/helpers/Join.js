export const manyToOneJoin = (left, foreignKey, right, prefix) => {
  const cpLeft = { ...left };
  Object.keys(left).forEach((leftKey) => {
    const currentForeignKeyValue = left[leftKey][foreignKey];
    console.log(currentForeignKeyValue);
    if (right[currentForeignKeyValue]) {
      Object.keys(right[currentForeignKeyValue]).forEach((attrKey) => {
        cpLeft[leftKey][`${prefix}${attrKey}`] = right[currentForeignKeyValue][attrKey];
      });
    }
  });
  return cpLeft;
};
