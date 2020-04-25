module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "plugins": [
        "react",
        "react-hooks",
        "@typescript-eslint",
    ],
    "env": {
        "browser": true,
        "es6": true,
    },
    "globals": {
        "process": true
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    "parser": "@typescript-eslint/parser",
    "rules": {
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "react/no-children-prop": 0
    },
};
