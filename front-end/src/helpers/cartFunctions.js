function sumItems(items) {
  const map = new Map();

  items.forEach((item) => {
    const { id, name, price, quantity } = item;

    if (map.has(id)) {
      const existingItem = map.get(id);
      const newQuantity = existingItem.quantity + quantity;
      map.set(id, { id, name, price, quantity: newQuantity });
    } else {
      map.set(id, { id, name, price, quantity });
    }
  });

  return Array.from(map.values());
}
export default sumItems;
