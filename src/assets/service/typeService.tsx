import { Type } from '../entities/type';
import typeData from '../data/type.json';

export class TypeService {
  private types: Type[] = typeData.type.map((typeData) => new Type(
    typeData.id,
    typeData.name,
    typeData.description,
    typeData.file
  ));

  getTypes(): Type[] {
    return this.types;
  }
}
