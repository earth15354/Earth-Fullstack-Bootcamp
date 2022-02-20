import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  bundleNodeModules: true,

  output: {
    format: ['umd', 'umd-min'],
    moduleName: 'ImageSlider',
    fileName(ctx, defaultName) {
      return 'image-slider[min].[format].js'
    },
    extractCSS: false,
  },

  plugins: {
    vue: true,
    typescript2: true,
  },

  babel: {
    configFile: false,
  },

  globals: {
    'vue': 'Vue',
    '@vue/composition-api': 'vueCompositionApi',
  },
}

export default config
