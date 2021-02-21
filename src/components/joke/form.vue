<template>
  <modal :visible="visible" :title="'Add Joke'">
    <form class="joke-form" @submit="submit">
      <div class="form-group row">
        <div class=" radio-label col-12">
          <h3>Select language</h3>
        </div>
        <div class="radio-options">
          <div class="radio-option" v-for="(item, iso) in options.idRange" :key="iso">
            <input type="radio" :id="'jokeLang' + iso" :value="iso" v-model="joke.lang" />
            <label :for="'jokeLang' + iso">
              <span class="label-text">{{ iso }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class=" radio-label col-12">
          <h3>Select category</h3>
        </div>
        <div class="radio-options">
          <div class="radio-option" v-for="(title, index) in options.categories" :key="index">
            <input type="radio" :id="'jokeCategory' + title" :value="title" v-model="joke.category" />
            <label :for="'jokeCategory' + title">
              <span class="label-text">{{ title }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class=" radio-label col-12">
          <h3>Select type</h3>
        </div>
        <div class="radio-options">
          <div class="radio-option">
            <input type="radio" id="jokeTypeSingle" :value="TYPE_SINGLE" v-model="joke.type" />
            <label for="jokeTypeSingle"><span class="label-text">single</span></label>
          </div>
          <div class="radio-option">
            <input type="radio" id="jokeTypeTwopart" :value="TYPE_TWOPART" v-model="joke.type" />
            <label for="jokeTypeTwopart"><span class="label-text">twopart</span></label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="JokePartFirst" class="textarea-label col-12">
          {{ joke.type === TYPE_SINGLE ? 'Joke' : 'Joke setup' }}
        </label>
        <div class="textarea-wrap">
          <textarea
            v-model="partFirst"
            id="JokePartFirst"
            class="form-control"
            name="JokePartFirst"
            cols="20"
            rows="5"
            required
          ></textarea>
        </div>
      </div>
      <div class="form-group row" v-if="joke.type === TYPE_TWOPART">
        <label for="JokePartSecond" class="textarea-label col-12">Joke delivery</label>
        <div class="textarea-wrap">
          <textarea
            v-model="partSecond"
            id="JokePartSecond"
            class="form-control"
            name="JokePartSecond"
            cols="20"
            rows="5"
            required
          ></textarea>
        </div>
      </div>
      <div class="row-submit row no-gutters">
        <button type="submit" class="btn btn-outline-primary">Submit</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { TYPE_SINGLE, TYPE_TWOPART } from '../../mixins/joke';
import { ALERT_TYPE_SUCCESS } from '../../mixins/alert';
import { JOKE_DEFAULT_LANG } from '../../config';
import modal from '../modal';

export default {
  name: 'jokeForm',

  components: { modal },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      joke: {
        category: '',
        type: TYPE_SINGLE,
        lang: JOKE_DEFAULT_LANG,
      },
      partFirst: '',
      partSecond: '',
    };
  },

  computed: {
    options() {
      return this.$store.getters.getOptions;
    },
    actLang() {
      return this.$store.getters.getActLang;
    },
  },

  methods: {
    submit(evt) {
      evt.preventDefault();
      const joke = Object.assign({}, this.joke);
      if (joke.type === TYPE_SINGLE) {
        joke.joke = this.partFirst;
      } else {
        joke.setup = this.partFirst;
        joke.delivery = this.partSecond;
      }
      this.$store.commit('addMyJoke', joke);
      this.jokeAdded();
      this.reset();
      this.$emit('close');
    },
    jokeAdded() {
      this.$store.commit('showAlert', {
        msg: `Your '${this.joke.lang}' joke was added successfully.`,
        type: ALERT_TYPE_SUCCESS,
      });
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
  },
  created() {
    this.TYPE_SINGLE = TYPE_SINGLE;
    this.TYPE_TWOPART = TYPE_TWOPART;
  },
};
</script>

<style scoped>
.radio-options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1.2rem;
}
.radio-option {
  padding: 0.1rem;
}
.radio-option > input {
  margin: 0 0.2rem;
}
.radio-label > h3 {
  margin: 0;
}
input[type='radio'] {
  display: none;
}
input[type='radio'] + label {
  display: flex;
  border: 2px solid #0084ff;
  padding: 0.3rem;
  transform: skew(-20deg);
  letter-spacing: 1px;
}
input[type='radio'] + label > .label-text {
  transform: skew(20deg);
}
input[type='radio']:checked + label {
  font-weight: bold;
  background-color: #0084ff;
  border: 1px solid #cccccc;
  color: white;
}
input[type='radio']:checked + label:hover {
  border-color: #0062cc;
}
textarea {
  width: 100%;
}
.textarea-wrap {
  width: 100%;
  margin: 0 1rem;
}
.form-group {
  margin-top: 0.5rem;
}
.textarea-label {
  font-size: 1.17rem;
  font-weight: bold;
}
.row-submit {
  margin-top: 0.5rem;
  justify-content: flex-end;
}
</style>
