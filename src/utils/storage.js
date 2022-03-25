import backgroundImgs from '../DATA/backgroundImgs';

const getItem = key => {
  try {
    const localData = localStorage.getItem(key);
    if (localData) {
      return JSON.parse(localData);
    } else {
      return backgroundImgs[0];
    }
  } catch (error) {
    return backgroundImgs[0];
    console.log(error);
  }
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getItem, setItem };
