import { isNullish, isArray } from './Types';

export const unify = (data, mapper) => {
  if (isNullish(data)) return null;

  if (isArray(data)) return data.map((value) => unify(value, mapper)).filter((value) => !!value);

  try {
    return mapper(data);
  } catch (e) {
    console.log(e);
  }
};
