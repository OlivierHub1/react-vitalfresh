export class Item {
  id?: number;
  name?: string;
  description?: string;
  file?: string;
  price?: number;
  type?: number;

  constructor(
    id?: number,
    name?: string,
    description?: string,
    file?: string,
    price?: number,
    type?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.file = file;
    this.price = price;
    this.type = type;
  }
}
