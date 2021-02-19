import { unify } from '../utils/Mapper';
import { isObject } from '../utils/Types';

export const toConfig = (data) => ({
  idRange: data.idRange ? unify(data.idRange, toIdRange) : null,
  flags: data.flags ?? [],
  categories: data.categories ?? [],
  types: data.types ?? [],
});

export const toIdRange = (data) => {
  if (!isObject(data)) return null;
  Object.keys(data).map((key) => (data[key] = { from: data[key][0] || 0, to: data[key][1] || 0 }));
  return data;
};
