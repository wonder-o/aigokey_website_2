<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { canonicalUrl, SITE_ORIGIN } from '@/config/site'

const route = useRoute()
const isNoIndex = computed(() => route.meta.noindex === true)
const pageUrl = computed(() => canonicalUrl(route.path))

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AigoKey',
  url: `${SITE_ORIGIN}/`,
  inLanguage: 'zh-CN',
})

const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AigoKey',
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/assets/aigokey-logo.png`,
})

useHead(() => ({
  link: isNoIndex.value ? [] : [{ rel: 'canonical', href: pageUrl.value }],
  meta: [
    { name: 'robots', content: isNoIndex.value ? 'noindex,follow' : 'index,follow' },
    { property: 'og:url', content: pageUrl.value },
    { property: 'og:site_name', content: 'AigoKey' },
    { property: 'og:locale', content: 'zh_CN' },
  ],
  script: route.path === '/' ? [
    { type: 'application/ld+json', children: websiteSchema },
    { type: 'application/ld+json', children: organizationSchema },
  ] : [],
}))
</script>
