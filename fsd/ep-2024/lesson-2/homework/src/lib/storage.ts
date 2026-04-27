const saveToStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('can not save');
  }
};

const getFromStorage = <T>(key: string, defaultValue: T) => {
  try {
    const result: T = JSON.parse(
      localStorage.getItem(key) ?? JSON.stringify(defaultValue),
    );
    return result;
  } catch {
    return defaultValue;
  }
};

export const createStorage = <T>(key: string) => {
  return {
    get: (defaultValue: T) => getFromStorage(key, defaultValue),
    set: (value: T) => saveToStorage(key, value),
  };
};
