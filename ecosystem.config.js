module.exports = {
	apps: [
		{
			script: 'npm run start',
			instances: "max",
            "exec_mode": "cluster",
			name: 'clg',
		},
	],
}