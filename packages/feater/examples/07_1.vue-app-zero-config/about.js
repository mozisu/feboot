import Vue from 'vue/dist/vue';

new Vue({
  el: '#root',
  data: {
    message: 'Hello, Feater!',
  },
  // eslint-disable-next-line quotes
  template: `<h1>{{ message }}</h1>`,
});
