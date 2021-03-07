const path = require( 'path' );
const glob = require( 'glob' );
const logging = require( 'webpack/lib/logging/runtime' );
const logger = logging.getLogger( 'wps' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const StylelintPlugin = require( 'stylelint-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const PurgeCssPlugin = require( 'purgecss-webpack-plugin' );
const SpriteLoaderPlugin = require( 'svg-sprite-loader/plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const HtmlPlugin = require( 'html-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const { PUBLIC_PATH, HOST, PORT } = require( './src/constants/global' );
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';

const paths = {
    src: path.resolve( __dirname, 'src' ),
    html: path.resolve( __dirname, 'src', 'assets', 'html' ),
    build: path.resolve( __dirname, 'build' ),
};

logger.info( `Mode: ${ mode }` );

const config = {
    mode,
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: paths.build,
        publicPath: PUBLIC_PATH,
    },
    stats: {
        assets: true,
        modules: false,
    },
    target: 'web',
    devtool: isDev
        ? 'eval-cheap-module-source-map'
        : 'none',
    devServer: {
        publicPath: PUBLIC_PATH,
        writeToDisk: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        stats: 'errors-only',
        host: HOST,
        port: PORT,
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 1%, last 2 versions, not dead',
                                    useBuiltIns: 'usage',
                                    loose: true,
                                    corejs: 3,
                                },
                            ],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },
            {
                test: /\.s?css$/i,
                use: [
                    // Creates `style` nodes from JS strings in dev
                    // Or extract css to own files in prod
                    isDev
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                            esModule: false,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'sprite.svg',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.hbs$/i,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: [
                        path.resolve( paths.html, 'helpers' ),
                    ],
                    partialDirs: [
                        path.resolve( paths.html, 'includes' ),
                    ],
                    inlineRequires: '@/assets/',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin( {
            emitWarning: true,
        } ),
        new StylelintPlugin( {
            emitWarning: true,
        } ),
        new MiniCssExtractPlugin( {
            filename: '[name].css',
        } ),
        new SpriteLoaderPlugin( {
            plainSprite: true,
        } ),
        new CopyPlugin( {
            patterns: [
                {
                    from: 'src/static',
                    noErrorOnMissing: true,
                },
            ],
        } ),
        ...glob.sync( '**/*.hbs', {
            cwd: path.resolve( paths.html, 'views' ),
            nodir: true,
        } ).map( file => new HtmlPlugin( {
            filename: path.resolve( paths.build, 'html', file.replace( '.hbs', '.html' ) ),
            template: path.resolve( paths.html, 'views', file ),
        } ) ),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: 'vendors',
                    enforce: true,
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': paths.src,
        },
    },
};

if ( isDev ) {
    config.plugins.push(
        new BundleAnalyzerPlugin( {
            openAnalyzer: false,
        } ),
    );
} else {
    config.plugins.push(
        new CleanWebpackPlugin( {
            cleanAfterEveryBuildPatterns: [ 'html' ],
        } ),
        new PurgeCssPlugin( {
            paths: glob.sync( `${ paths.src }/**/*`, {
                nodir: true,
            } ),
        } ),
    );
}

module.exports = config;