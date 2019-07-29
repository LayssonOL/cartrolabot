const path = require('path');

module.exports = {
    devtool: "source-map",

    entry: './src/index.tsx',
    // Enable sourcemaps for debugging webpack's output.

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        // extensions: [".ts", ".tsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js(x?)$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(s?)css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    }

};