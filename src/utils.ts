export function cloneDeep(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = cloneDeep(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = cloneDeep(obj[key]);
      return newObj;
    }, {});
  }
}
