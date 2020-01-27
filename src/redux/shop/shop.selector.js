import {createSelector} from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Selector to convert object data into an array of our items
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

// Find collection.id matching the url parameter of our collection map
export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections =>
      collections[collectionUrlParam]
);
