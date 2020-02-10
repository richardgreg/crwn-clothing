import React from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import 
  CollectionsOverview
 from "../../components/collections-overview/collections-overview";
 import CollectionPage from "../collection/collection";

import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

import {UpdateCollections} from "../../redux/shop/shop.action";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
class ShopPage extends React.Component {
  // React knows that if you write a state property declaration in your component
  // it will under the hood invoke super() so we can leverage the state value
  state = {
    loading: true
  };

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
      this.setState({loading: false});
    });
  }

  render(){
    const {match} = this.props;
    const {loading} = this.state;
    return(
      // render is a method that takes a fxn where the params in the fxn are
      // simply the params that the component will recieve which are the match,
      // location and history props that route passes into the components which 
      // gives collection page access to match that we use in selector
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => 
          <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => 
          <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
})
  
export default connect(null, mapDispatchToProps)(ShopPage);
