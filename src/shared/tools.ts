export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

export function isString(obj: any): boolean {
  return obj !== null && (typeof obj === 'string' || obj instanceof String);
}

export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every((key) => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

export function override(target: Object, source: Object) {
  if (!isObject(source)) return target;

  for (const prop in source) {
    target[prop] = source[prop];
  }

  return target;
}

export function merge(o1: object, o2: object) {
  const merged = {};

  if (isObject(o1)) {
    override(merged, o1);
  }

  if (isObject(o2)) {
    override(merged, o2);
  }

  return merged;
}
