new Vue({
  el: "#hrx_starter",
  data: {
    username: "",
    greeting: "",
  },
  methods: {
    greet: function () {
      this.greeting = "Hi, ";
      this.greeting = this.greeting.concat(this.username, "!");
    },
  },
});
