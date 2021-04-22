<template>
  <main class="container">
    <header>
      <h1>Blog of the WebSite</h1>
      <h4>And it's made with Nuxt</h4>
      <div v-if="adUrl" class="ad">
        <img :src="adUrl" alt="Advertisement" />
      </div>
    </header>
    <section class="article-grid">
      <div
        v-for="(article, articleIndex) of articles"
        :key="'art-' + articleIndex"
        class="article"
        @click="goToArticle(`/blog/${article.id}`)"
      >
        <article-mini
          :title="article.title"
          :summary="article.summary"
          :image="article.image"
        ></article-mini>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import ArticleMini from '~/components/blog/ArticleMini.vue'
export default {
  components: {
    ArticleMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/articles`)
    const articles = data
    return {
      articles,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  mounted() {
    setTimeout(async () => {
      const { data } = await axios.get('/api/ad')
      this.adUrl = data.url
    }, 1000)
  },
  methods: {
    goToArticle(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  grid-gap: 10px;
  margin-top: 40px;
}
.article {
  cursor: pointer;
  margin-bottom: 20px;
}
.ad img {
  width: 100%;
  height: 200px;
}
@media screen and (max-width: 600px) {
  .ad img {
    width: 100%;
    height: 100px;
  }
  .article-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>
