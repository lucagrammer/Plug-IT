<!--
  Component: Slideshow
  Description: Slideshow of images with a Paragraph inside
  Props:
  ├── slides: array of objects, each containing image, alt, title, description and link
  └── time-per-slides: time in milliseconds for each slide. Default value: 6sec
-->

<template>
  <div class="slider-container">
    <!-- SLIDES LIST-->
    <transition
      v-for="(slide, slideIndex) of slides"
      :key="'container-' + slideIndex"
      name="fade"
      class="image-container"
    >
      <div
        v-if="currentIndex === slideIndex"
        :key="'slide-' + slideIndex"
        class="image-container"
        :style="{ 'background-image': `url(${slide.image})` }"
        :aria-label="slide.alt"
        role="img"
      >
        <!-- Body of each slide -->
        <section class="slide-body-container">
          <paragraph>
            <nuxt-link :to="slide.link !== undefined ? slide.link : ''">
              <h1>{{ slide.title }}</h1>
            </nuxt-link>
            <p>
              {{ slide.description }}
            </p>
          </paragraph>
        </section>

        <!-- Dots -->
        <div class="slider-status dots">
          <span
            v-for="(dot, dotIndex) of slides"
            :key="'dot-' + dotIndex"
            ref="dot"
            :class="'dot mdi ' + dotClassStatus(dotIndex)"
            @click="setIndex(dotIndex)"
          ></span>
        </div>
      </div>
    </transition>

    <!-- PREV/NEXT CONTROLS -->
    <div class="slider-control next" @click="next()">
      <span class="mdi mdi-chevron-right"></span>
    </div>
    <div class="slider-control prev" @click="prev()">
      <span class="mdi mdi-chevron-left"></span>
    </div>
  </div>
</template>

<script>
import Paragraph from './Paragraph.vue'
export default {
  components: { Paragraph },
  props: {
    // slides: array of objects containing image, alt, title, description and link for each slide
    slides: { type: Array, default: () => [], required: true },

    // time-per-slides: time in milliseconds for each slide. Default value: 6sec
    timePerSlide: { type: Number, default: () => 6000 },
  },
  data() {
    return {
      // Slide index currently shown
      currentIndex: 0,

      // Number of slides
      maxIndex: this.slides.length - 1,

      // Timer for slider
      timer: null,
    }
  },
  computed: {
    // Return the class for the dot based on the index of the slide
    dotClassStatus() {
      return (slideIndex) =>
        slideIndex === this.currentIndex
          ? 'mdi-checkbox-blank-circle'
          : 'mdi-checkbox-blank-circle-outline'
    },
  },
  mounted() {
    this.timer = setInterval(() => this.updateIndex(), this.timePerSlide)
  },
  methods: {
    // Index setter for dots-commands
    setIndex(value) {
      this.currentIndex = value
      this.resetTimer()
    },

    // Index setter fot next-command
    next() {
      this.currentIndex =
        this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1
      this.resetTimer()
    },

    // Index setter for prev-command
    prev() {
      this.currentIndex =
        this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1
      this.resetTimer()
    },

    // Reset the timer
    resetTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => this.updateIndex(), this.timePerSlide)
    },

    // Go to the next slide
    updateIndex() {
      this.currentIndex =
        this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1
    },
  },
}
</script>

<style scoped>
/* Component containers  */
.slider-container {
  height: 85vh;
  min-height: 520px;
  position: relative;
}
.image-container {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide-body-container {
  position: absolute;
  bottom: 0;
  padding-left: 20%;
  padding-right: 20%;
  width: 60%;
  min-height: 150px;
  padding-bottom: 40px;
  background: rgba(238, 238, 238, 0.9);
}

/* Positioning and appearance of the next/prev commands */
.slider-control {
  color: black;
  position: relative;
  font-size: 55px;
  display: inline-block;
  top: 75%;
}
.next {
  float: right;
}

/* Positioning and appearance of the dots */
.slider-status {
  color: black;
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: block;
  font-size: 20px;
  text-align: center;
}
.dot {
  margin-left: 8px;
  margin-right: 8px;
}

/* Fade animation on slide change */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to,
.fade-leave-active {
  opacity: 0;
}
</style>
