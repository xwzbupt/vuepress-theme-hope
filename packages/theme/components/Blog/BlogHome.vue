<template>
  <div class="page blog">
    <BlogHero />

    <div class="blog-page-wrapper">
      <main class="blog-home">
        <MyTransition :delay="0.16">
          <ProjectList />
        </MyTransition>

        <MyTransition :delay="0.24">
          <ArticleList :key="$route.path" />
        </MyTransition>
      </main>

      <MyTransition :delay="0.16">
        <BlogInfo />
      </MyTransition>
    </div>

    <MyTransition :delay="0.28">
      <Content :key="$route.path" class="theme-default-content" custom />
    </MyTransition>
  </div>
</template>

<script src="./BlogHome" />

<style lang="stylus">
.page.blog
  .blog-page-wrapper
    .blog-home
      max-width 780px
      overflow hidden
      flex 1

      .theme-container:not(.mobile) &
        margin 0 15px

  .theme-default-content:empty
    padding 0
</style>
