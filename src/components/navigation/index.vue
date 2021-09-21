<template>
  <div class="hooks">
    <div class="hooks-top">
      <div class="hook hook-add" @click="showAddJokeForm"><strong>+</strong></div>
    </div>
    <div class="hooks-down">
      <div class="hook hook-top" @click="scrollTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-bar-to-up"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="10" x2="12" y2="20" />
          <line x1="12" y1="10" x2="16" y2="14" />
          <line x1="12" y1="10" x2="8" y2="14" />
          <line x1="4" y1="4" x2="20" y2="4" />
        </svg>
      </div>
      <div class="hook hook-top" @click="scrollDown">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-bar-to-down"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="20" x2="20" y2="20" />
          <line x1="12" y1="14" x2="12" y2="4" />
          <line x1="12" y1="14" x2="16" y2="10" />
          <line x1="12" y1="14" x2="8" y2="10" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',

  methods: {
    showAddJokeForm() {
      this.$emit('showAddJokeForm');
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    scrollDown() {
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
};
</script>

<style scoped>
.hooks-top {
  position: fixed;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  top: 4%;
}
.hooks-down {
  position: fixed;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  bottom: 4%;
}

.hooks .hook {
  margin: 0.5rem 1rem;
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #ffffff;
  background-color: rgba(0, 132, 255, 0.7);
  border: 2px solid rgba(219, 219, 219, 0.3);
  align-items: center;
  justify-content: center;
}
@media (max-width: 768px) {
  .hooks .hook {
    margin: 0.2rem;
  }
}
.hook:hover {
  background-color: #0069d9;
  border-color: #ffffff;
  cursor: pointer;
}
</style>
