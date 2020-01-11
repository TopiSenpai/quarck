module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
	},
	"plugins": [
		"vue",
	],
	"rules": {
		"quotes": ["warn", "double"],
		"semi": ["warn", "always"],
		"no-trailing-spaces": "warn",
		"require-atomic-updates": "warn",
		"no-unused-vars": "warn",
		"no-useless-escape": "warn",
		"no-await-in-loop": "warn",
		"dot-location": ["warn", "property"],
		"semi": "warn",
		"comma-dangle": ["warn", {
			"arrays": "always-multiline",
			"objects": "always-multiline",
		}],
		"no-constant-condition": ["warn", {
			"checkLoops": false,
		}],
	}
};
