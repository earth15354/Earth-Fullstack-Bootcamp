<script lang="ts">
import { createComponent, ref, onMounted, computed, watch, onBeforeUnmount } from '@vue/composition-api'
import ResizeObserverPonyfill from 'resize-observer-polyfill'

export interface Element {
  name: string
  image: string
}

export interface Props {
  elements: Element[]
}

export default createComponent<Props>({
  props: {
    elements: Array,
  },

  setup(props) {
    const ResizeObserver = (
      typeof window !== 'undefined'
        ? ((window as any).ResizeObserver || ResizeObserverPonyfill)
        : ResizeObserverPonyfill
    ) as typeof ResizeObserverPonyfill

    const slider = ref<HTMLElement>(null)
    const sliderWidth = ref(0)
    const isMobile = computed(() => sliderWidth.value < 768)
    const visibleCount = computed(() => isMobile.value ? 2 : 4)
    
    const groups = computed(() => {
      const count = Math.ceil(props.elements.length / visibleCount.value)
      const groups: Element[][] = []

      for (let i = 0; i < count; ++i) {
        groups[i] = []

        for (let j = 0; j < visibleCount.value; ++j) {
          const element = props.elements[i * visibleCount.value + j]

          if (element) {
            groups[i][j] = element
          }
        }
      }

      return groups
    })

    const groupStyles = computed(() => {
      const styles: any[] = []

      for (let i = 0; i < groups.value.length; ++i) {
        const group = groups.value[i]
        styles[i] = {}

        styles[i].width = 100 * (group.length / visibleCount.value) + '%'

        if (activeGroupIndex.value !== i) {
          styles[i].position = 'absolute'
          styles[i].top = '0'
          styles[i].left = (-100 * (activeGroupIndex.value || 0)) + (i * 100) + '%'
        }
      }

      return styles
    })

    const imgWrapperWidth = computed(() => {
      return sliderWidth.value / visibleCount.value + 'px'
    })

    const activeGroupIndex = ref<number>(null)

    onBeforeUnmount(watch(groups, g => activeGroupIndex.value = 0))

    const ob = ref<ResizeObserver>(null)

    onMounted(() => {
      ob.value = new ResizeObserver(() => sliderWidth.value = slider.value!.clientWidth)
      ob.value.observe(slider.value!)
    })

    onBeforeUnmount(() => ob.value!.disconnect())

    return { slider, groups, activeGroupIndex, groupStyles, sliderWidth, imgWrapperWidth }
  }
})
</script>

<template>
<div ref="slider" class="Slider">
  <transition-group name="SliderTransition" class="Slider__groups" tag="div">
    <template v-for="(group, i) of groups">
      <div class="Slider__group" :key="i" :style="groupStyles[i]">
        <div v-for="element of group" :key="element.name" class="Slider__img-wrapper" :style="{
          width: imgWrapperWidth
        }">
          <img :src="element.image" :alt="element.name" class="Slider__img">
        </div>
      </div>
    </template>
  </transition-group>

  <div class="Slider__controls">
    <div v-for="(group, i) of groups" :key="i" class="Slider__control" :class="{
      'is-active': activeGroupIndex === i
    }" @click="activeGroupIndex = i"></div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.Slider__groups
  @apply relative overflow-hidden

.Slider__group
  @apply flex

.Slider__img-wrapper
  @apply px-2 flex justify-center items-center

.Slider__img
  max-height: 7rem

.SliderTransition
  &-enter-active,
  &-leave-active,
  &-move
    transition: all 0.5s
  
  &-enter
    transform: translateX(100%)

    &-to
      transform: none
  
  &-leave
    transform: none

    &-to
      transform: translateX(100%)

.Slider__controls
  @apply flex justify-center mt-8

.Slider__control
  @apply w-4 h-4 rounded-full border border-white border-solid cursor-pointer mx-1
  transition: all 0.15s

  &:hover
    background-color: rgba(#fff, 0.5)

  &.is-active
    @apply bg-white
</style>