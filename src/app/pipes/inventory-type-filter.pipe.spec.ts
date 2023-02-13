import { ItemSizeFilterPipe } from './inventory-type-filter.pipe';

describe('InventoryTypeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ItemSizeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
