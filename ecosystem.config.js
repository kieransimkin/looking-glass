module.exports = {
	apps: [
		{
			script: 'npm',
			instances: "max",
            args: "start",
            "exec_mode": "cluster",
			name: 'clg',
		},
	],
}