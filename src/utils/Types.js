export const isNullish = (val) => val === null || val === undefined;

export const isString = (val) => typeof val === 'string' || val instanceof String;

export const isFunction = (val) => typeof val === 'function';

export const isArray = (val) => Array.isArray(val);

export const isObject = (val) => val === Object(val) && !isArray(val) && !isFunction(val);
