module.exports = {
	openapi: '3.1.0',
	info: {
		title: 'Tech Prism',
		description: 'Marketplace to buy tech items all at one place',
		contact: {
			email: 'admin@techprism.com',
		},
		version: '1.0.0',
	},
	servers: [
		{
			description: 'Development',
			url: 'http://localhost:5000/api/v1',
		},
	],
	tags: [
		{ name: 'auth', description: 'User authentication APIs' },
		{ name: 'products', description: 'All about products' },
	],
};
