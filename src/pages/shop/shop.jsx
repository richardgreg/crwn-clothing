import React from 'react';
import {Route} from "react-router-dom";

import 
  CollectionsOverview
 from "../../components/collections-overview/collections-overview";
 import CollectionPage from "../collection/collection";

import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    // get reference to our collections in firestore db
    const collectionRef = firestore.collection("collections");

    // Send us a snapshot Whenever the collectionRef updates or runs for the
    // first time
    collectionRef.onSnapshot(async snapshot => {
      convertCollectionsSnapshotToMap(snapshot);
    });
  }

  render(){
    const {match} = this.props;
    return(
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }
}
  
export default ShopPage;
