import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
