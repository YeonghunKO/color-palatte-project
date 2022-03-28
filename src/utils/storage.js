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
    console.log(error);
    return backgroundImgs[0];
  }
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getItem, setItem };
