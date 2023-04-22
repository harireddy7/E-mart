import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingAddress: {
			name: String,
			address: String,
			city: String,
			postalCode: String,
			country: String,
			addressType: {
				type: String,
				enum: ['HOME', 'OFFICE'],
        default: 'HOME'
			},
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
      default: null,
		},
    paymentInfo: {
      orderId: String,
      paymentOrderId: String,
      paymentId: String,
      signature: String,
    }
	},
	{
		timestamp: true,
	}
);

orderSchema.pre(/^find/, function () {
  this.populate({ path: 'orderItems', populate: 'product' });
});

const Order = mongoose.model('Order', orderSchema);


export default Order;

