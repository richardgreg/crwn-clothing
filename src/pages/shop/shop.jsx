import React from 'react';
import {Route} from "react-router-dom";

import 
  CollectionsOverview
 from "../../components/collections-overview/collections-overview";
 import CollectionPage from "../collection/collection";

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
const ShopPage = ({match}) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
