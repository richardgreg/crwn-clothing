import React from 'react';
import StripeCheckout from "react-stripe-checkout";

// For processing payment in backend
const onToken = token => {
  console.log(token);
  alert("Payment Successful");
}

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_o7kZGqiXaOPMxWCoAHwMjixA00JLHo1UDp";

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image=""
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
