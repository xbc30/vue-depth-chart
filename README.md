## Vue-Depth-Chart

![image](images/cover.png)

Configurable Depth Chart component based on Vue

English | [简体中文](https://github.com/xbc30/vue-depth-chart/blob/master/README_ZH.md) | [Article](https://github.com/xbc30/vue-depth-chart/blob/master/article.md)

* 日间模式

![image](images/effect-type-mouse.png)

* 夜间模式

![image](images/effect-night.png)

### Installation

You can install and save an entry to your package.json with the following command:

```javascript
npm i vue-depth-chart --save
```

### Usage

Globally reference ```vue-depth-chart``` in ```main.js```, you can use it directly in any component (note that the corresponding css should be introduced in the component)

* main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

import "vue-depth-chart"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

```

* App.vue

```Vue
<template>
  <div id="app">
    <vue-depth-chart :data="data" :customizeOptions="options" :theme="theme" />
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      options: {
        width: 780,
        height: 540,
      },
      theme: "day",
      data: {
        buy: [
          { price: 10977.76, amount: 0.303 },
          { price: 10977.63, amount: 0.462 },
          ...more items
        ],
        sell: [
          { price: 10986, amount: 52.896 },
          { price: 10985.91, amount: 48.57 },
          ...more items
        ],
      },
    };
  },
};
</script>
<style scoped>
@import "~vue-depth-chart/dist/vue-depth-chart.css";
</style>
```

#### Effect

### Config Options

* Basic configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| width | Viewable width of depth map | ```780``` | ```780``` |
| height | Visual height of depth map | ```540``` | ```540``` |
| initOffset | Initial offset, to solve line blur | ```0.5``` | ```0.5``` |
| bgColor | Overall background color | ```rgba(255,255,255,0.1)``` | ```rgba(0,0,0,0.9)``` |

* Watermark configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| watermaskType | Watermark type, optional ```text```(text) ```image```(picture) | ```image``` | ```image``` |
| watermaskContent | Watermark content, when ```watermaskType```=```text```, it should be a specific text string, when ```watermaskType```=```image```, it should be Is the corresponding image base64 string | ```data:image/png;base64,..``` | ```data:image/png;base64,..``` |

* Line configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| gridLineColor | Grid line color | ```#ddd``` | ```#333``` |
| rulerLineColor | Ruler line color color | ```#999``` | ```rgb(47,47,47)``` |

* Shaft configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| xAxisGridSpace | x-axis background grid spacing | ```90``` | ```90``` |
| yAxisGridSpace | y-axis background grid spacing | ```30``` | ```30``` |
| xAxisFontColor | x-axis ruler scale font color | ```#666``` | ```#999``` |
| yAxisFontColor | y-axis ruler scale font color | ```#666``` | ```#999``` |
| xAxisFontSize | x-axis ruler scale font size | ```12px Aria``` | ```12px Aria``` |
| yAxisFontSize | y-axis ruler scale font size | ```12px``` | ```12px Aria``` |
| yAxisShadowColor | y-axis ruler scale shadow color | ```#fff``` | ```#333``` |

* Pitch configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| bottomSpace | The distance between the depth map and the y-axis | ```8``` | ```8``` |
| buySellSpace | End-point spacing of buy and sell orders | ```10``` | ```10``` |

* Basic configuration of prompt box

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| tipWidth | Tip width | ```120``` | ```120``` |
| tipHeight | Tip height | ```60``` | ```60``` |
| tipLocationLineColor | Tip Location Line Color | ```#999``` | ```#999``` |
| tipLocationDotRadius | Tip Location Dot Radius | ```5``` | ```5``` |
| tipType | The type of the tip type of the mouse movement, ```axis``` (on the xy axis) ```mouse``` (absolute positioning display following the mouse position) | ```mouse``` | ```mouse` `` |

* Prompt box (sale) configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| tipBuyLocationDotBgColor | The background color of the dots of the pay prompt box | ```#fff``` | ```#fff``` |
| tipBuyBorderColor | Border color of the tipBuy box | ```#67c23a``` | ```#67c23a``` |
| tipBuyBgColor | Background color of the prompt box to pay | ```#f0f9eb``` | ```#f0f9eb``` |
| tipBuyTextColor | Prompt text color of the buy order prompt box | ```#67c23a``` | ```#67c23a``` |
| tipSellLocationDotBgColor | Dot background color of the sell order prompt box | ```#fff``` | ```#fff``` |
| tipSellBorderColor | Border color of the sell order tip box | ```#f56c6c``` | ```#f56c6c``` |
| tipSellBgColor | Sell order prompt box background color | ```#fef0f0``` | ```#fef0f0``` |
| tipSellTextColor | Tips text color of the sell order prompt box | ```#f56c6c``` | ```#f56c6c``` |

* Buy and sell strokes and fill configuration

| Options | Description | Day mode | Night mode |
| :------| :------: | :------: | :------: |
| buyStrokeColor | Buy Stroke Color | ```rgb(111,168,0)``` | ```rgb(111,168,0)``` |
| sellStrokeColor | Sell Stroke Color | ```rgb(234,0,112)``` | ```rgb(234,0,112)``` |
| buyLinearGradientArray | buy order fill gradient array (top to bottom) | ```["rgb(141,186,51)", "rgb(160,197,87)", "rgb(189,215,138)", "rgb(228,238,206)", " rgb(250,250,241)"]``` | ```["rgb(80,120,3)", "rgb(72,106,4)", "rgb(51,74,5)", "rgb(35,49, 7)", "rgb(20,25,8)"]``` |
| sellLinearGradientArray | Sell order fill gradient array (top to bottom) | ```["rgb(255,148,152)", "rgb(255,164,172)", "rgb(255,192,197)", "rgb(255,228,230)", "rgb(255,249,249) "]``` | ```["rgb(217,45,127)", "rgb(172,37,101)", "rgb(115,27,68)", "rgb(64,19,39)", "rgb(26,13,18)"]``` |