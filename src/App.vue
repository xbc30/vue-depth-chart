<template>
  <div id="app">
    <vue-depth-chart :data="data" :customizeOptions="options" :theme="theme" />
  </div>
</template>

<script>
const buyArray = [
  { price: 10970, amount: 52.896 },
  { price: 10970.11, amount: 48.57 },
  { price: 10970.33, amount: 46.589 },
  { price: 10970.57, amount: 45.745 },
  { price: 10970.62, amount: 45.45 },
  { price: 10970.99, amount: 43.012 },
  { price: 10971.08, amount: 41.56 },
  { price: 10971.26, amount: 40.521 },
  { price: 10971.45, amount: 39.986 },
  { price: 10971.72, amount: 39.731 },
  { price: 10971.88, amount: 38.896 },
  { price: 10972, amount: 37.896 },
  { price: 10972.27, amount: 33.57 },
  { price: 10972.5, amount: 33.589 },
  { price: 10972.68, amount: 32.745 },
  { price: 10972.77, amount: 30.45 },
  { price: 10973, amount: 29.012 },
  { price: 10973.12, amount: 25.56 },
  { price: 10973.24, amount: 25.521 },
  { price: 10973.53, amount: 24.986 },
  { price: 10973.69, amount: 24.731 },
  { price: 10973.92, amount: 23.896 },
  { price: 10974, amount: 22.896 },
  { price: 10974.32, amount: 19.57 },
  { price: 10974.5, amount: 17.589 },
  { price: 10974.58, amount: 16.745 },
  { price: 10974.77, amount: 15.45 },
  { price: 10974.98, amount: 15.012 },
  { price: 10975, amount: 14.56 },
  { price: 10975.16, amount: 13.521 },
  { price: 10975.35, amount: 12.986 },
  { price: 10975.5, amount: 12.731 },
  { price: 10976, amount: 10.896 },
  { price: 10976.34, amount: 9.772 },
  { price: 10976.59, amount: 6.983 },
  { price: 10976.68, amount: 5.884 },
  { price: 10976.97, amount: 5.123 },
  { price: 10977.04, amount: 4.949 },
  { price: 10977.16, amount: 3.583 },
  { price: 10977.34, amount: 3.002 },
  { price: 10977.48, amount: 1.627 },
  { price: 10977.5, amount: 0.665 },
  { price: 10977.63, amount: 0.462 },
  { price: 10977.76, amount: 0.303 },
];
const sellArray = [
  { price: 10986, amount: 52.896 },
  { price: 10985.91, amount: 48.57 },
  { price: 10985.73, amount: 46.589 },
  { price: 10985.57, amount: 45.745 },
  { price: 10985.42, amount: 45.45 },
  { price: 10985.19, amount: 43.012 },
  { price: 10985.0, amount: 41.56 },
  { price: 10984.96, amount: 40.521 },
  { price: 10984.75, amount: 39.986 },
  { price: 10984.32, amount: 39.731 },
  { price: 10984.08, amount: 38.896 },
  { price: 10984, amount: 37.896 },
  { price: 10983.87, amount: 33.57 },
  { price: 10983.6, amount: 33.589 },
  { price: 10983.58, amount: 32.745 },
  { price: 10983.37, amount: 30.45 },
  { price: 10983, amount: 29.012 },
  { price: 10982.78, amount: 25.56 },
  { price: 10982.64, amount: 25.521 },
  { price: 10982.53, amount: 24.986 },
  { price: 10982.19, amount: 24.731 },
  { price: 10982.02, amount: 23.896 },
  { price: 10982, amount: 23.816 },
  { price: 10981.92, amount: 19.57 },
  { price: 10981.8, amount: 17.589 },
  { price: 10981.48, amount: 16.745 },
  { price: 10981.37, amount: 15.45 },
  { price: 10981.08, amount: 15.012 },
  { price: 10981, amount: 14.56 },
  { price: 10980.76, amount: 13.521 },
  { price: 10980.55, amount: 12.986 },
  { price: 10980.5, amount: 12.731 },
  { price: 10980.0, amount: 10.896 },
  { price: 10979.84, amount: 9.772 },
  { price: 10979.59, amount: 8.983 },
  { price: 10979.28, amount: 8.884 },
  { price: 10979.17, amount: 8.123 },
  { price: 10979.0, amount: 7.949 },
  { price: 10978.96, amount: 7.583 },
  { price: 10978.84, amount: 6.002 },
  { price: 10978.48, amount: 5.89 },
  { price: 10978.15, amount: 1.665 },
  { price: 10978.0, amount: 1.462 },
  { price: 10977.96, amount: 0.303 },
];
import VueDepthChart from "./components/vue-depth-chart.vue";

export default {
  name: "App",
  components: {
    VueDepthChart,
  },
  data() {
    return {
      options: {
        width: 780,
        height: 540,
        tipType: "axis",
        watermaskType: "image",
        watermaskContent:
          "data:image/png;base64,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",
      },
      theme: "day",
      data: {
        buy: buyArray.reverse(),
        sell: sellArray,
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
