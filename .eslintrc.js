module.exports = {
    extends: ["react-app", "plugin:jsx-a11y/recommended"],
    rules: {
        // disable a specific rule
        "jsx-a11y/control-has-associated-label": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "no-noninteractive-element-to-interactive-role": "off",
        // or turn off everything from jsx-a11y
        "jsx-a11y/no-static-element-interactions": "off",
    },
};