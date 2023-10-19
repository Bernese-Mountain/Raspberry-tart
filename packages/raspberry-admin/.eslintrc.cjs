module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parser": 'vue-eslint-parser', 
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": '@typescript-eslint/parser', 
        "tsconfigRootDir": "__dirname", 
        "project": ['tsconfig.json'],
        "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", ".eslintrc.cjs", "vite.config.ts"],
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
