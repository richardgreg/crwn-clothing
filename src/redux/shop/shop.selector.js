import {createSelector} from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Selector to convert object data into an array of our items
// Section 12: State normalization
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// Find collection.id matching the url parameter of our collection map
// Look inside collections map object to find corresponding object
export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections =>
      collections ? collections[collectionUrlParam] : null
);

// Selector that will pull in the fetching property
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

// Check if collections is loaded in order to display on collections page
// and return a bool lesson 172
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);
