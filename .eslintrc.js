module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    jest: true
  },
  plugins: ["@typescript-eslint"],
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "require-atomic-updates": "off", // disallow assignments that can lead to race conditions due to usage of await or yield
    "indent": [
        // enforces 4 spaces identation
        "error",
        4,
        {
            "SwitchCase": 1,
            "ignoredNodes": ["ConditionalExpression"]
        }
    ],
    "linebreak-style": ["error", "unix"], // enforce consistent linebreak style
    "quotes": ["error", "single"], // enforce the consistent use of either backticks, double, or single quotes
    "semi": ["warn", "always"], // require or disallow semicolons instead of ASI
    "semi-spacing": "error", // disallow spaces before semicolons
    "no-var": "error", // require let or const instead of var
    "eqeqeq": [2, "allow-null"], // require the use of === and !==
    "no-template-curly-in-string": "warn", // Disallow template literal placeholder syntax in regular strings
    "array-callback-return": "warn", // Enforces return statements in callbacks of array’s methods
    "curly": "error", // Require Following Curly Brace Conventions
    "default-case": "error", // Require Default Case in Switch Statements
    "dot-location": ["error", "property"], // Enforce newline before and after dot
    "no-empty-function": "warn", // Disallow empty functions
    "no-eval": "error", // Disallow eval()
    "no-extend-native": "error", // Disallow Extending of Native Objects
    "no-multi-spaces": "error", // Disallow multiple spaces
    "no-return-assign": "error", // Disallow Assignment in return Statement
    "block-spacing": "warn", // Disallow or enforce spaces inside of blocks after opening block and before closing block
    "comma-spacing": "warn", // enforce consistent spacing before and after commas
    "no-lonely-if": "warn", // disallow if statements as the only statement in else blocks
    "prefer-object-spread": "warn", // disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
    "prefer-const": "warn", // require const declarations for variables that are never reassigned after declared
    "array-bracket-spacing": ["error", "never"], // Disallow or enforce spaces inside of brackets
    "no-param-reassign": "warn", // Disallow Reassignment of Function Parameters
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
  indent: ['error', 4],
};
