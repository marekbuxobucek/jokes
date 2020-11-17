<template>
  <div id="app" class="container">
    <div class="hook-add" @click="formVisible = true"><strong>+</strong></div>
    <div class="row logo-wrap">
      <img alt="Joke logo" src="./assets/smile.png" />
    </div>
    <div class="row">
      <ul class="list-selector selector-lang">
        <li
          v-for="(lang, iso) in options.jokes.idRange"
          :key="iso"
          @click="setLanguage(iso)"
          :class="{ active: actLang === iso }"
        >
          {{ iso }}
        </li>
      </ul>
    </div>
    <joke v-for="(joke, index) in jokes" :joke="joke" :key="index" />
    <div class="row btn-wrap">
      <button class="btn btn-outline-primary btn--blue" @click="getJokeRandom">
        Get more fun!
      </button>
    </div>
    <jokeForm :visible="formVisible" @close="formVisible = !formVisible" />
    <alert :msg="error" />
  </div>
</template>

<script>
import joke from "./components/joke";
import jokeForm from "./components/joke/form";
import alert from "./components/alert";
export default {
  name: "App",
  data() {
    return {
      error: "",
      formVisible: false
    };
  },
  components: {
    joke,
    jokeForm,
    alert
  },
  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
    options() {
      return this.$store.getters.getOptions;
    },
    jokes() {
      return this.$store.getters.getJokes(this.actLang);
    }
  },
  created() {
    this.$store.dispatch("getOptions");
  },
  methods: {
    getJokeRandom() {
      this.$store.dispatch("getJokeRandom", this.actLang);
    },
    setLanguage(iso) {
      this.$store.commit("setActLang", iso);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.logo-wrap {
  justify-content: center;
}
.list-selector {
  display: inline-flex;
  width: 100%;
  justify-content: space-evenly;
  padding: 0;
}
.list-selector > li {
  display: flex;
  border: 2px solid #0084ff;
  border-radius: 0 10px;
  margin: 1rem;
  padding: 1rem;
  letter-spacing: 1px;
}
.list-selector > li.active {
  background-color: #0084ff;
  border: 2px solid #cccccc;
  color: white;
}
.list-selector > li:hover {
  border-color: #0062cc;
  cursor: pointer;
  text-decoration: underline;
}
.btn-wrap {
  justify-content: center;
  margin-top: 15px;
}
.logo-wrap > img {
  height: 300px;
  width: auto;
}
.hook-add {
  position: fixed;
  top: 8%;
  right: 0%;
  transform: translate(-100%, -100%);
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 50%;
  color: #ffffff;
  background-color: #0084ff;
  border: 2px solid #cccccc;
}
.hook-add:hover {
  background-color: #0069d9;
  border-color: #0062cc;
  cursor: pointer;
}
</style>
