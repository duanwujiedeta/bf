module.exports = {
    filenameHashing:false,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            // chunks: ["chunk-vendors", "chunk-common", "index"]
        },
        aboutus: {
            entry: 'src/aboutus.js',
            template: 'public/aboutus.html',
            filename: 'aboutus.html',
        },
        helpCenter: {
            entry: 'src/helpCenter.js',
            template: 'public/helpCenter.html',
            filename: 'helpCenter.html',
        },
        pricing: {
            entry: 'src/pricing.js',
            template: 'public/pricing.html',
            filename: 'pricing.html',
        },
        privacyPolicy: {
            entry: 'src/privacyPolicy.js',
            template: 'public/privacyPolicy.html',
            filename: 'privacyPolicy.html',
        },
        userAgreement: {
            entry: 'src/userAgreement.js',
            template: 'public/userAgreement.html',
            filename: 'userAgreement.html',
        },
        termService: {
            entry: 'src/termService.js',
            template: 'public/termService.html',
            filename: 'termService.html',
        },
        convention: {
            entry: 'src/convention.js',
            template: 'public/convention.html',
            filename: 'convention.html',
        }
    },
    // publicPath: "./",
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico?t=logo',
            favicon16: 'favicon.ico?t=logo',
            appleTouchIcon: 'favicon.ico?t=logo',
            maskIcon: 'favicon.ico?t=logo',
            msTileImage: 'favicon.ico?t=logo'
        }
    },
    // devServer: getProxyObj(),
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
    /* chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '企业中心'
                return args
            })
    }, */
}

function getProxyObj() {
    let env = process.env.NODE_ENV;
    let proxyUrls = {
        "development": "https://base-api.powerbuyin.top/",
    };
    if (env == 'development') {
        return {
            // port: 8080,
            host: "nicholas",
            // https: false,
            // 自动启动浏览器
            open: true,
            disableHostCheck: true,
            proxy: {
                '/dev': {
                    changeOrigin: true,
                    secure: false, // https代理需要加这一句
                    cookieDomainRewrite: "nicholas",
                    debug: true,
                    target: proxyUrls[env],
                    pathRewrite: {
                        '^/dev': ''
                    }
                },
                '/api': {
                    changeOrigin: true,
                    secure: false, // https代理需要加这一句
                    cookieDomainRewrite: "nicholas",
                    debug: true,
                    target: process.env.VUE_APP_SHOP_ADMIN_URL,
                    pathRewrite: {
                        '^/api': ''
                    }
                },

            }
        }
    } else {
        return {};
    }
}