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
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "arrow-parens": ["error", "as-needed"],
        "comma-dangle": ["error", "always-multiline"],
        "no-console": "error",
        "eol-last": ["error", "always"],
        "max-len": ["error", {
            "code": 140,
            "ignoreStrings": true
        }],
        "semi": ["error", "always"],
        "sort-imports": ["error", {
            "ignoreDeclarationSort": true
        }],
        "quotes": ["error", "single", {
            "avoidEscape": true
        }],
        "react/no-children-prop": "off",
    },
};
