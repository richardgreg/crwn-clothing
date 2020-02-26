import React from "react";
import {connect} from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item"

import {selectCollection} from "../../redux/shop/shop.selector";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = ({collection}) => {
  const {title, items} = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
            <CollectionItem key={item.id} item={item}/>
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  )};

// In order to do this properly, use optional param in 
// mapStateToProps (ownProps)
const mapStateToProps = (state, ownProps) => ({
  // pass selectCollection state in order to wire everything together
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});
export default connect(mapStateToProps)(CollectionPage);
