
<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <p>
      <a rel="noreferrer" href="https://github.com/webszy/ym-vite-template" target="_blank">
        Youmai ym-vite-template
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>


  </div>
</template>
<script setup>
const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>
