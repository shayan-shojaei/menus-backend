import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string, _: ArgumentMetadata): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new NotFoundException();
    }
    return new ObjectId(value);
  }
}
