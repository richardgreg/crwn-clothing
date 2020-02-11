import React from 'react';
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import 
  CollectionsOverview
 from "../../components/collections-overview/collections-overview";
 import CollectionPage from "../collection/collection";

import {fetchCollectionsStartAsync} from "../../redux/shop/shop.action";
import { selectIsCollectionFetching} from "../../redux/shop/shop.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

 // Shop page is nested in a route. Shop page automatically
 // passes location, history and match as props. Destr. match.
class ShopPage extends React.Component {
  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render(){
    const {match, isCollectionFetching} = this.props;
    return(
      // render is a method that takes a fxn where the params in the fxn are
      // simply the params that the component will recieve which are the match,
      // location and history props that route passes into the components which 
      // gives collection page access to match that we use in selector
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => 
          <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => 
          <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
