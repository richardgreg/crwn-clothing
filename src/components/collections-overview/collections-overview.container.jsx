import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {selectIsCollectionFetching} from "../../redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import
CollectionsOverview
  from "../../components/collections-overview/collections-overview";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// Compose lets us pass these fxns in by just calling them.
// Compose evalutes from right to left
const CollectionsOverviewContainer = compose (
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;