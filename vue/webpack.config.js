/** 
 * webpack4配置【 开发环境 】
*/
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoader = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const resolvePath = inputPath => path.join(__dirname, inputPath);
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let webpackConfig = {
	mode: 'development',
	// devtool: 'cheap-module-eval-source-map',
	stats: 'minimal',
	entry: {
		app: ["babel-polyfill", resolvePath('./src/main.js')]
	},
	output: {
		filename: '[name].[hash:8].js',
		path: resolvePath('dist'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolvePath('src'),
		}
    },
    module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js?$/,
				loader: 'happypack/loader?id=happyBabel'
			},
			{
				test: /\.less$/,
				use: [ 'vue-style-loader', 'css-loader', 'less-loader' ]
			},
			{
				test: /\.css$/,
				use: [ 'vue-style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1000, // 小于1k的图片自动转成base64格式
							outputPath: 'images/', //图片打包后的文件夹
							esModule: false
						}
					}
				]
			}
		]
	},
	plugins: [
		// 处理 .vue
		new VueLoader(),
		// 输出 index.html 到 output
		new HtmlwebpackPlugin({
			template: resolvePath('index.html')
		}),
		new HappyPack({
			//用id来标识 happypack处理那里类文件
			id: 'happyBabel',
			use: [{
				// loader: 'babel-loader?cacheDirectory=true',
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: [
						'@babel/preset-env' //使用这个预设，会根据浏览器来选择插件转化ES5
					]
				},
				exclude: file => (
					/node_modules/.test(file) && !/\.vue\.js/.test(file)
				)
			}],
			//共享进程池
			threadPool: happyThreadPool,
			//允许 HappyPack 输出日志
			verbose: true,
		})
	],
	optimization: {
		minimize: true,
		//分包
		splitChunks: {// 打包 node_modules里的代码
			chunks: 'all',
		},
		runtimeChunk: true,  // 打包 runtime 代码
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({}),// 压缩 css,使用minimizer会自动取消webpack的默认配置，所以记得用UglifyJsPlugin
		]
	},
}

module.exports = webpackConfig;