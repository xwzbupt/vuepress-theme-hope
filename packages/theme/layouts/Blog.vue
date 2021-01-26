<template>
  <Common :sidebar="false">
    <template #sidebar-bottom>
      <BlogInfo />
    </template>

    <Password
      v-if="isPathEncrypted && !isGlobalEncrypted"
      @password-verify="setPassword"
    />
    <div v-else class="page blog">
      <div class="blog-page-wrapper">
        <BlogPage />

        <MyTransition :delay="0.16">
          <BlogInfo />
        </MyTransition>
      </div>
    </div>
  </Common>
</template>

<script src="./Blog" />
