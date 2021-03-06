
// const isH5 =Taro.ENV_TYPE === 'h5'

const isH5 = process.env.CLIENT_ENV === 'h5'

const HOST = '"http://localhost:7001"'
const HOST_M = '"https://m.you.163.com"'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST,
    HOST_M: isH5 ? '"/api-m"' : HOST_M
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/api/'
          },
          changeOrigin: true
        },
        '/api-m/': {
          target: JSON.parse(HOST_M),
          pathRewrite: {
            '^/api-m/': '/api/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
