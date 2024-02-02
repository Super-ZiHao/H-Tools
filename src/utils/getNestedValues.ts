function getNestedValues(obj: {[key: string]: any}, propertyPaths: string[]) {
  let current: any = obj;
  propertyPaths.some(path => {
    if (current && typeof current === 'object') {
      current = current[path];
      return false;
    } else {
      current = undefined;
      return false;
    }
  });
  return current;
}

export default getNestedValues;