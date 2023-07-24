import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: jonsnow@got.com
 *         name:
 *           type: string
 *           default: testuser
 *         password:
 *           type: string
 *           default: hello1234
 *     RegisterUserSuccess:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         token:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *           default: false
 *     ErrorMsgStack:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         stack:
 *           type: string
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: jonsnow@got.com
 *         password:
 *           type: string
 *           default: hello1234
 *     LoginUser400:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           default: Missing email or password
 *         stack:
 *           type: string
 *     LoginUser401:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           default: Invalid email or password
 *         stack:
 *           type: string
 * 
 */
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		cart: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		shippingAddress: [
			{
				name: {
					type: String,
					required: true
				},
				address: {
					type: String,
					required: true
				},
				city: {
					type: String,
					required: true
				},
				postalCode: {
					type: String,
					required: true
				},
				country: {
					type: String,
					required: true
				},
				addressType: {
					type: String,
					required: true,
					enum: ['HOME', 'OFFICE']
				}
			},
		],
	},
	{
		timestamp: true,
	}
);

userSchema.methods.matchPassword = async function (passwordtoMatch) {
	return await bcrypt.compare(passwordtoMatch, this.password);
};

userSchema.pre(/^find/, function () {
	this.populate({ path: 'cart', populate: 'product' });
});

userSchema.post('save', function(doc, next) {
  doc.populate({ path: 'cart', populate: 'product' }).execPopulate().then(function() {
    next();
  });
})

// save -> register, update
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
