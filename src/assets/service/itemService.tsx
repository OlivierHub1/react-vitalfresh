import { Item } from '../entities/item';
import itemData from '../data/item.json'
import { TypeService } from './typeService';

//Get type
const typeService = new TypeService();
const types = typeService.getTypes();

export class ItemService {
    private items: Item[] = itemData.item.map((itemData) => new Item(
        itemData.id,
        itemData.name,
        itemData.description,
        itemData.file,
        itemData.price,
        itemData.type
      ));
    
      getItems(): Item[] {
        return this.items;
      }

      getItemsByType(itemType: number): string {
        const matchingType = types.find((type) => type.id === itemType);
        if (matchingType) {
          return matchingType.name;
        }
        return '';
      }

}
