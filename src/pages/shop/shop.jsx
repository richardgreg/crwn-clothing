import React from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import 
  CollectionsOverviewContainer
 from "../../components/collections-overview/collections-overview.container";
 import CollectionPageContainer from "../collection/collection.container";

import {fetchCollectionsStart} from "../../redux/shop/shop.action";

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
class ShopPage extends React.Component {
  componentDidMount() {
    const {fetchCollectionsStart} = this.props;

    fetchCollectionsStart();
  }

  render(){
    const { match} = this.props;
    return(
      // render is a method that takes a fxn where the params in the fxn are
      // simply the params that the component will recieve which are the match,
      // location and history props that route passes into the components which 
      // gives collection page access to match that we use in selector
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
  
export default connect(null, mapDispatchToProps)(ShopPage);
