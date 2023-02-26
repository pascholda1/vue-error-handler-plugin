# @pascholda1/vue-error-handler-plugin

Plugin to register middlewares to handle errors in a Vue app

## Installation

````shell
npm i @pascholda1/vue-error-handler-plugin
````

## Usage

````javascript

import Vue from 'vue';

import VueErrorHandlerPlugin from '@pascholda1/vue-error-handler-plugin';

Vue.use(VueErrorHandlerPlugin);

VueErrorHandlerPlugin
    // handler for Errors of any type
    .addMiddleware({handler: error => alert(error.toString())})
    // handler for Errors of type SyntaxError
    .addMiddleware({
      handler: () => alert('SyntaxError handler'),
      forErrorClass: SyntaxError,
    });


````

````vue

<template>
  <button type="button" @click="error">ERROR</button>
</template>

<script>
export default {
  name: 'App',
  created() {
    // You can access the plugin by $vueErrorHandlerPlugin to add more middlewares
    this.$vueErrorHandlerPlugin
        .addMiddleware({
          handler: this.myComponentErrorHandler,
        });
  },
  beforeDestroy() {
    // but don't forget to remove your component middlewares
    this.$vueErrorHandlerPlugin
        .removeMiddleware({
          handler: this.myComponentErrorHandler,
        });
  },
  errorCaptured(err, vm, info) {
    // all arguments passed to $errorHandler will also be passed to the middlewares
    this.$errorHandler(err, vm, info);
  },
  methods: {
    myComponentErrorHandler(error) {
      console.error(error)
    },
    error() {
      this.$errorHandler(new Error('an error occurred'))
    }
  }
}
</script>

````
