import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  bundleNodeModules: true,

  output: {
    format: ['esm', 'cjs'],
    moduleName: 'ImageSlider',
    extractCSS: false,
  },

  plugins: {
    vue: true,
    typescript2: true,
  },

  babel: {
    configFile: false,
  },

  externals: ['resize-observer-polyfill', 'vue', '@vue/composition-api'],
}

export default config
