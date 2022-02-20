import { VueConstructor } from 'vue'
import Slider from './components/Slider.vue'

function install(Vue: VueConstructor) {
  // @ts-ignore
  if (install.installed) {
    return
  }

  // @ts-ignore
  install.installed = true
  // @ts-ignore
  Vue.component('ImageSlider', Slider)
}

const plugin = { install }

let GlobalVue = null
if (typeof window !== 'undefined') {
  // @ts-ignore
  GlobalVue = window.Vue;
  // @ts-ignore
} else if (typeof global !== 'undefined') {
  // @ts-ignore
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin)
}

export default Slider
