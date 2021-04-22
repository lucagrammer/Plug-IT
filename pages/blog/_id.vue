<template>
  <section class="container">
    <header>
      <h1>{{ article.title }}</h1>
      <h4>{{ article.summary }}</h4>
      <img :src="article.image" :alt="article.summary" />
    </header>
    <article>
      <p>
        {{ article.content }}
      </p>
    </article>
    <section class="comments">
      <h3>Comments</h3>
      <h4 v-if="article.comments.length === 0">There are no comments</h4>
      <div
        v-for="(comment, commentIndex) of article.comments"
        :key="'comments-' + commentIndex"
        class="comment"
      >
        <div class="content">
          {{ comment.content }}
        </div>
        <div class="date">
          Posted on: {{ new Date(comment.createdAt).getDate() }}/{{
            new Date(comment.createdAt).getMonth()
          }}/{{ new Date(comment.createdAt).getFullYear() }}
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/article/${id}`
    )
    const article = data
    return {
      article,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.comments {
  margin-top: 60px;
  text-align: left;
}
.comment {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>
