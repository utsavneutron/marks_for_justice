new Vue({
  el: "#hrx_starter",
  data: {
    username: "",
    greeting: "",
  },
  methods: {
    greet: function () {
      this.greeting = "Hi, Young Padawan";
      this.greeting = this.greeting.concat(this.username, "!");
    },
  },
});
