<!-- eslint-disable -->
<template>
  <button v-if="githubAuth" class="btn btn-dark ml-auto" type="button" @click="login">
    Login with
    <fa :icon="['fab', 'github']" />
  </button>
</template>

<script>
import openWindow from '~/helpers/openWindow';

export default {
  name: 'LoginWithGithub',

  computed: {
    githubAuth: () => window.config.githubAuth,
    url: () => '/api/oauth/github',
  },

  mounted() {
    window.addEventListener('message', this.onMessage, false);
  },

  beforeDestroy() {
    window.removeEventListener('message', this.onMessage);
  },

  methods: {
    async login() {
      const newWindow = openWindow('', 'login');

      const url = await this.$store.dispatch('auth/fetchOauthUrl', {
        provider: 'github',
      });

      newWindow.location.href = url;
    },

    /**
     * @param {MessageEvent} e
     */
    onMessage(e) {
      if (e.origin !== window.origin || !e.data.token) {
        return;
      }

      this.$store.dispatch('auth/saveToken', {
        token: e.data.token,
      });

      this.$router.push({ name: 'home' });
    },
  },
};

/**
 * @param  {Object} options
 * @return {Window}
 */
</script>
