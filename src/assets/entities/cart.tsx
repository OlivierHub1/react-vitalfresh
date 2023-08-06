export class Cart {
    id?: number;
    quantity?: number;
    name?:string;
    price?: number;
    file?: string;
  
    constructor(
        id?: number,
        quantity?: number,
        name?: string,
        price?: number,
        file?: string,
    ) {
      this.id = id;
      this.quantity = quantity;
      this.name = name;
      this.price = price;
      this.file = file;
    }
  }
  