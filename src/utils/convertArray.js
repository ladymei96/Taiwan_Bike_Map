export const transArray = (arr, split) => {
  const newArr = [];
  const total = arr.length;
  for (let i = 0, j = 0; i < total; i += split, j++) {
    newArr[j] = arr.splice(0, split);
  }
  console.log(newArr);
  return newArr;
};

const arr = [1, 2, 3, 'a', 'b', 'c', 'X', 'Y', 'Z'];
