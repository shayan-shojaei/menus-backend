import { TransformFnParams } from 'class-transformer';
import { ObjectId } from 'mongodb';

export const toObjectId = (v: TransformFnParams): ObjectId | ObjectId[] => {
  if (Array.isArray(v.value)) {
    const objectIds: ObjectId[] = [];
    v.value.forEach((val) => {
      if (ObjectId.isValid(val)) {
        objectIds.push(new ObjectId(val));
      } else {
        objectIds.push(val);
      }
    });
    return objectIds;
  } else {
    if (
      v &&
      v.value &&
      typeof v?.value === 'string' &&
      v?.value?.includes(',')
    ) {
      const values = v.value.split(',');
      const objectIds: ObjectId[] = [];
      values.map((item) => {
        if (ObjectId.isValid(item)) {
          objectIds.push(new ObjectId(item));
        } else {
          return false;
        }
      });
      return objectIds;
    } else {
      if (ObjectId.isValid(v.value)) {
        return new ObjectId(v.value);
      } else {
        return v.value;
      }
    }
  }
};
