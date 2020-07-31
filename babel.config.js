// https://babeljs.io/docs/en/

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]
    ]
};