import ShopActionTypes from "./shop.types";

export const UpdateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTONS,
  payload: collectionsMap
});
