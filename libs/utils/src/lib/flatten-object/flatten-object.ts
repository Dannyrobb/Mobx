export function flattenObject(data: object) {
  const result = {};
  function recurse(cur: object, prop: string) {
    if (Object(cur) !== cur) {
      // @ts-ignore
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) recurse(cur[i], prop + '[' + i + ']');
      // @ts-ignore
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        // @ts-ignore
        recurse(cur[p], prop ? prop + '.' + p : p);
      }
      // @ts-ignore
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
}
