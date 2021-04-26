<!--
  Component: Paragraph
  Description: A general purpose paragraph with an (optional) image
  Named slots: 
  └── default slot: paragraph's text
  Props:
  ├── image: image for the paragraphs (optional)
  ├── image-cap: alt attribute of the image for SEO purposes (optional)
  └── postion: position of the paragraph's text. Either 'right' or 'left'. Right by default (optional)
-->

<template>
  <section class="paragraph">
    <!-- Left image of the paragraph   -->
    <div v-if="leftImageVisibility" class="paragraph-image">
      <figure class="wrapper">
        <img :src="image" :alt="imageCap" />
      </figure>
    </div>

    <!-- Text of the paragraph -->
    <div :class="paragraphClass">
      <div :class="'wrapper ' + paragraphTypeClass">
        <slot> </slot>
      </div>
    </div>

    <!-- Right image of the paragraph -->
    <div v-if="rightImageVisibility" class="paragraph-image">
      <figure class="wrapper">
        <img :src="image" :alt="imageCap" />
      </figure>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // image: image for the paragraphs (optional)
    image: { type: String, default: () => '' },

    // image-cap: alt attribute of the image for SEO purposes (optional)
    imageCap: { type: String, default: () => 'ICT image' },

    // postion: position of the paragraph's text. Either 'right' or 'left'. Right by default (optional)
    position: { type: String, default: () => 'right' },
  },
  data() {
    return {
      // Visibility flag of the left image
      leftImageVisibility: this.image !== '' && this.position === 'right',

      // Visibility flag of the right image
      rightImageVisibility: this.image !== '' && this.position === 'left',

      // Class for the paragraph's text
      paragraphClass:
        this.image !== '' ? 'paragraph-text' : 'paragraph-text-only',

      // Class for the wrapper of the paragraph's text
      paragraphTypeClass:
        this.image === ''
          ? ''
          : this.position === 'right'
          ? ' right-paragraph'
          : ' left-paragraph',
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
  margin: auto;
}
.paragraph {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  width: 100%;
  display: flow-root;
}
.paragraph-image,
.paragraph-text,
.paragraph-text-only {
  position: relative;
  width: 100%;
}

.left-paragraph {
  padding-right: 2em;
}
.right-paragraph {
  padding-left: 2em;
}
.left-paragraph :first-child,
.right-paragraph :first-child {
  margin-top: 0px;
}

.paragraph-image * {
  display: block;
}

img {
  width: auto;
  max-width: 100%;
  margin: auto;
}

@media (min-width: 720px) {
  .paragraph-image,
  .paragraph-text {
    float: left;
  }
  .paragraph-text {
    width: 60%;
  }
  .paragraph-image {
    width: 40%;
  }
}
@media (max-width: 719px) {
  img {
    max-height: 70vh;
  }
  .left-paragraph {
    padding-right: 0px;
  }
  .right-paragraph {
    padding-left: 0px;
  }
  .paragraph-image {
    float: right;
  }
  .left-paragraph :first-child,
  .right-paragraph :first-child {
    margin-top: revert;
  }
}
</style>
