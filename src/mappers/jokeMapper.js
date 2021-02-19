import { unify } from '../utils/Mapper';

export const toJoke = (data) => ({
  id: data.id ?? 0,
  type: data.type ?? '',
  group: data.group ?? '',
  category: data.category ?? '',
  lang: data.lang ?? '',
  joke: data.joke ?? '',
  setup: data.setup ?? '',
  delivery: data.delivery ?? '',
  flags: data.flags ? unify(data.flags, toFlags) : null,
});

export const toFlags = (data) => ({
  explicit: data.explicit ?? false,
  nsfw: data.nsfw ?? false,
  political: data.political ?? false,
  racist: data.racist ?? false,
  religious: data.religious ?? false,
  sexist: data.sexist ?? false,
});
