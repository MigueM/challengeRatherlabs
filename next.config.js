/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (isServer) {
      config.externals.push({
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      })
    }
    return config
  },
}

module.exports = {
  env: {
    REACT_APP_QUIZ_CONTRACT_ADDR: '0x437eF217203452317C3C955Cf282b1eE5F6aaF72',
    REACT_APP_ACCOUNT_ADD_PREFIX: '0x70a08231000000000000000000000000',
  },
}
