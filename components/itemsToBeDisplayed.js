export function itemsToBeDisplayed(item, searchQuery, showSelected, selected) {
  return item.filter(
    (i) => matchesSearch(searchQuery, i) &&
      showSelectedItems(showSelected, selected, i)
  );
}
function showSelectedItems(showSelected, selected, i) {
  return !showSelected || selected.includes(i.id);
}

export function matchesSearch(searchQuery, i) {
  return (
    !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
