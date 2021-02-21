<template>
  <div class="joke-part col-md-6">
    <div class="joke-part__bubble">
      <div class="bubble-header row no-gutters">
        <div class="col-12">
          <span class="bubble-lang">
            <strong>{{ language.toUpperCase() }}</strong> </span
          >&nbsp;
          <span>{{ category }}</span>
        </div>
      </div>
      <div class="bubble-body row no-gutters">
        <div class="col-12">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jokePart',

  props: {
    language: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
  },
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
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 50);
  border-radius: 1rem;
  padding: 0.5rem 0;
}
.joke.my .joke-part__bubble {
  border: 2px solid #b2d9a0;
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
