const path = require('path');
module.exports = {
    // ...
    module: {
        rules: [
            // ...
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 3 versions', 'ie >9']
                                })
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 3 versions', 'ie >9']
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ],
            }
        ]
    }
}