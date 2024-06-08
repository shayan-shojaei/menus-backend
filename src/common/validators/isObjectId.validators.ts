import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { ObjectId } from 'mongodb';

export const IS_OBJECT_ID = 'isObjectId';

/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_OBJECT_ID,
      validator: {
        validate: (value): boolean => {
          if (typeof value === 'string') {
            if (value && value.includes(',')) {
              const values = value.split(',');
              return values.every((v) => ObjectId.isValid(v));
            }
          }

          return ObjectId.isValid(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property is not a valid value',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
