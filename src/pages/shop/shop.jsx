import React from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import 
  CollectionsOverview
 from "../../components/collections-overview/collections-overview";
 import CollectionPage from "../collection/collection";

import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

import {UpdateCollections} from "../../redux/shop/shop.action";

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    // get reference to our collections in firestore db
    const collectionRef = firestore.collection("collections");

    // Send us a snapshot Whenever the collectionRef updates or runs for the
    // first time
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
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

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
})
  
export default connect(null, mapDispatchToProps)(ShopPage);
