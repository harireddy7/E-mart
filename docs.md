# Index

1. Auth
   1. Sign up ✅
   2. Sign in ✅
   3. Sign out ✅
2. Product
   1. Get all products ✅
   2. Get product by id ✅
3. Profile
   1. Update personal info ✅
   2. update password ✅
   3. Update address
4. Cart
   1. Add to cart ✅
   2. remove from cart ✅
   3. checkout from cart ✅
   4. Save order details & payment details to db ✅
5. Orders
   1. Show user orders, recent first ✅
6. dynamic page titles
7. oAuth login integration
8. Admin screens
9. Product search
10. Product pagination


## Features

1. user details
2. products
3. cart
4. checkout
5. profile page
6. user orders

store = {
   user: {
      data: {
         name,
         email,
         token,
      },
      address: []
      cart: [],
      orders: []
   },
   products: []
}





bugs::

add to cart w/o signing ✅


## Cart

### checkout

   1. Select Address
      1. shipping address
      2. billing address (optional)

   2. Payments Page
      1. Pay via Razorpay
         1. create order in razorpay with node
         2. return order_id & order details
         3. show razorpay payment popup
         4. success
            1. store the order in db
         5. failure         
            1. Try again button in the popup
   
   3. Show orders once payment is successful
   4. Show Cart if payment is failed




## Integrate OAuth and OIDC (29 May 2024)

### Integrate Social signin (eg: google)

1. register tech prism with google and get clientId, clientSecret
   1. add them to node .env

2. Add Login with Google button to Frontend Signup/Signin page
   1. clicking should create an url with required query params (scopes, redirectUri, clientId)
   2. should take user to authorization server (accounts.google.com )
   3. once user signins and authorize tech-prism to access email and profile scopes, come back to app
   4. exchange code with accesstoken making api call to node
   5. From node, make token call to google with clientId and clientSecret to get accesstoken
   6. store that token in db against the user along with user details in ID Token
   7. Send the access and refresh tokens back to FE client along with user details




## Integrate Payment Service

### Integrate Razorpay

1. BE: Install `razorpay` npm package and create an instance out of it with id and secret
2. BE: add a route to create order details and send back order and payment link
3. BE: add a payment/webhook route to receive payment status details
   1. verify signature and process the request
   2. redirect the request to frontend url
4. FE: call payment/order API to create order and redirect to payment link received in API
5. FE: once payment is completed/failed, handle payment result page

'https://checkout.razorpay.com/v1/checkout.js'