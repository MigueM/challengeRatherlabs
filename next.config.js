/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })
    return config
  },
  env: {
    REACT_APP_QUIZ_CONTRACT_ADDR: '0x437eF217203452317C3C955Cf282b1eE5F6aaF72',
    REACT_APP_ACCOUNT_ADD_PREFIX: '0x70a08231000000000000000000000000',
  },
}
