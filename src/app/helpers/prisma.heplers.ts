import { isArray } from 'lodash';

export const excludeFields = <T>(
  data: T,
  fields: string[],
): any => {
  if (!data) {
    return data;
  }

  if (isArray(data)) {
    return (data as T[]).map(item =>
      getItemWithRemovedField<T>(item, fields),
    );
  } else {
    return getItemWithRemovedField<T>(data, fields);
  }
};

const getItemWithRemovedField = <T>(item: T, fields: string[]): any =>
  Object.fromEntries(
    Object.entries(item as any)
      .filter(([key]) => !fields.includes(key)),
  );
