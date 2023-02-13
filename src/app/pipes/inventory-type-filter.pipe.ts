import { Pipe, PipeTransform } from '@angular/core';
import { Size } from '../enums/size';
import { Item } from '../models/item';

@Pipe({
  name: 'itemSizeFilter'
})
export class ItemSizeFilterPipe implements PipeTransform {

  transform(value: Item[] | null, size: Size): Item[]|null {
    return value?.filter(item => item.size ==  size) ?? null;
  }

}
