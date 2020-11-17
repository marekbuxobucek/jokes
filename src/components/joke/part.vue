<template>
  <div class="joke-part col-md-6">
    <div class="joke-part__bubble">
      <div class="bubble-header row no-gutters">
        <div class="col-12">
          <strong>{{ joke.lang.toUpperCase() }}</strong
          >:&nbsp;<span v-if="joke.id >= 0">{{ joke.id }}</span
          >&nbsp;<span>{{ joke.category }}</span>
        </div>
      </div>
      <div class="bubble-body row no-gutters">
        <div class="col-12">
          {{ plainText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jokePart",
  props: {
    plainText: {
      type: String,
      default: ""
    },
    joke: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.joke-part {
  padding: 0.5rem;
}
@media (max-width: 768px) {
  .joke-part {
    padding: 0.2rem;
  }
}
.joke-part__bubble {
  border: 2px solid #cccccc;
  border-radius: 1rem;
  padding: 0.5rem 0;
}
.bubble-header,
.bubble-body {
  text-align: left;
}
.bubble-header {
  padding-left: 0.5rem;
}
.bubble-body {
  padding-left: 1rem;
}
</style>
