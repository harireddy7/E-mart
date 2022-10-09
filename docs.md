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
   4. Save order details & payment details to db
5. Orders
   1. Show user orders, recent first
   2. click to show complete order details
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





Cart

    checkout

        shipping address

        ?billing address

        Pay via Razorpay

            create order in razorpay with node
                return order_id & order details
                show razorpay payment popup
                    success
                        store the order in db
                    failure
                        Try again button in the popup








