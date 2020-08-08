// src/components/index.js

import Vue from "vue";
import VueDepthChart from "./vue-depth-chart.vue";

const Components = {
    VueDepthChart
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;