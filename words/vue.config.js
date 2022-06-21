module.exports = {
    // publicPath: "./",
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    devServer: getProxyObj(),
    // runtimeCompiler: false,
    productionSourceMap: false,
    // lintOnSave: false,
    //警告 webpack 的性能提示
    /*   configureWebpack: {
          performance: {
              hints: 'warning',
              //入口起点的最大体积 整数类型（以字节为单位）
              maxEntrypointSize: 50000000,
              //生成文件的最大体积 整数类型（以字节为单位 300k）
              maxAssetSize: 30000000,
              //只给出 js 文件的性能提示
              assetFilter: function (assetFilename) {
                  return assetFilename.endsWith('.js');
              }
          }
      } */
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'words for myself'
                return args
            })
    },
}

function getProxyObj() {
    let env = process.env.NODE_ENV;
    let proxyUrls = {
        "development": "https://open.jrtkqk.com/partner-api/",
    };
    if (env == 'development') {
        return {
            // port: 8080,
            // host: "0.0.0.0",
            // https: false,
            // 自动启动浏览器
            open: true,
            proxy: {
                '/dev': {
                    secure: false, // https代理需要加这一句
                    target: proxyUrls[env],
                    changeOrigin: true,
                    pathRewrite: {
                        '^/dev': ''
                    }
                }

            }
        }
    } else {
        return {};
    }
}