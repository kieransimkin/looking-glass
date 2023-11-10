module.exports = {
	apps: [
		{
			script: 'node_modules/.bin/next',
			instances: "max",
            args: "start",
            "exec_mode": "cluster",
			name: 'clg',
		},
	],
}