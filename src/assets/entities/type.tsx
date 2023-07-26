export class Type {
  id?: number;
  name?: string;
  description?: string;
  file?: string;

  constructor(id?: number, name?: string, description?: string, file?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.file = file;
  }
}
