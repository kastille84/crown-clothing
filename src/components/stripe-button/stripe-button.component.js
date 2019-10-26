import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
  //we are just console.loging because we wont make actual payments right now
  console.log(token)
  alert('Payment Successfule')
}

const StripeCheckoutButton = ({price}) => {
  //stripe wants price in cents, for proper charge to be made
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_pPo6PSpJRmzt6uvEEuMrrNc4";

  return (
    //go to github repo to see all the optional props you can pass
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      //token, is a success callback func that triggers when we submit
      token={onToken}
      stripeKey={publishableKey}
    />
  )

}

//we imported it in checkout component
export default StripeCheckoutButton;