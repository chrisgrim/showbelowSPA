<template>
  <card :title="'home'">
    {{ 'you_are_logged_in' }}
  </card>
</template>

<script>
export default {
  middleware: 'auth',

  metaInfo() {
    return { title: 'home' };
  },
};
</script>
