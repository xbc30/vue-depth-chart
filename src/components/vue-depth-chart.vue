<template>
  <div>
    <div class="content-wrap">
      <!-- <img style="opacity: 1;" :src="logo" ref="watermaskImage2" alt /> -->
      <!-- 文字水印或图片水印 -->
      <canvas ref="watermask" :width="options.width" :height="options.height"></canvas>
      <!-- 网格 -->
      <canvas ref="grid" :width="options.width" :height="options.height"></canvas>
      <!-- 主深度图 -->
      <canvas ref="depth" :width="options.width" :height="options.height"></canvas>
      <!-- 坐标轴 -->
      <canvas ref="axis" :width="options.width" :height="options.height"></canvas>
      <!-- 提示框 -->
      <canvas
        ref="tip"
        :width="options.width"
        :height="options.height"
        @mousemove="onMouseMove"
        @mouseout="onMouseOut"
      ></canvas>
    </div>
  </div>
</template>

<script>
// import logo from "./../assets/logo.png";

// 深度图默认配置项
const defaultDayOptions = {
  // 基础配置
  width: 780, // 深度图可视宽
  height: 540, // 深度图可视高
  initOffset: 0.5, // 初始偏移，解决线条模糊
  bgColor: "rgba(255,255,255,0.1)", // 整体背景色

  // 水印配置
  watermaskType: "image", // 水印配置类型 "text"(文本) "image"(图片)
  watermaskContent: "vue-depth-chart", // 文本水印 直接赋值文本 图片水印时 import对象

  // 线条配置
  gridLineColor: "#ddd", // 网格线条颜色
  rulerLineColor: "#999", // 标尺线条颜色颜色

  // 轴配置
  xAxisGridSpace: 90, // x轴背景网格间距
  yAxisGridSpace: 30, // y轴背景网格间距
  xAxisFontColor: "#666", // x轴标尺刻度字体颜色
  yAxisFontColor: "#666", // y轴标尺刻度字体颜色
  xAxisFontSize: "12px Aria", // x轴标尺刻度字体大小
  yAxisFontSize: "12px Aria", // y轴标尺刻度字体大小
  yAxisShadowColor: "#fff", // y轴标尺刻度阴影颜色

  // 间距配置
  bottomSpace: 8, // 深度图与y轴的间距
  buySellSpace: 10, // 买卖单终点间距

  // 提示框
  tipWidth: 120,
  tipHeight: 60,
  tipLocationLineColor: "#999", // 提示框定位线条颜色
  tipLocationDotRadius: 5, // 提示框圆点半径
  tipType: "mouse", // 鼠标移动提示信息位置 axis(xy轴上) mouse(跟随鼠标位置绝对定位显示)

  // 买 提示框
  tipBuyLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipBuyBorderColor: "#67c23a", // 提示框边框颜色
  tipBuyBgColor: "#f0f9eb", // 提示框背景色
  tipBuyTextColor: "#67c23a", // 提示框提示文字颜色

  // 卖 提示框
  tipSellLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipSellBorderColor: "#f56c6c", // 提示框边框颜色
  tipSellBgColor: "#fef0f0", // 提示框背景色
  tipSellTextColor: "#f56c6c", // 提示框提示文字颜色

  // 自定义深度样式配置
  buyStrokeColor: "rgb(111,168,0)", // 买单笔触颜色 rgb(111,168,0)
  sellStrokeColor: "rgb(234,0,112)", // 卖单笔触颜色 rgb(234,0,112)
  buyLinearGradientArray: [
    "rgb(141,186,51)",
    "rgb(160,197,87)",
    "rgb(189,215,138)",
    "rgb(228,238,206)",
    "rgb(250,250,241)",
  ],
  sellLinearGradientArray: [
    "rgb(255,148,152)",
    "rgb(255,164,172)",
    "rgb(255,192,197)",
    "rgb(255,228,230)",
    "rgb(255,249,249)",
  ],
};

// 深度图默认配置项
const defaultNightOptions = {
  // 基础配置
  width: 780, // 深度图可视宽
  height: 540, // 深度图可视高
  initOffset: 0.5, // 初始偏移，解决线条模糊
  bgColor: "rgba(0,0,0,0.9)", // 整体背景色

  // 水印配置
  watermaskType: "image", // 水印配置类型 "text"(文本) "image"(图片)
  watermaskContent: "vue-depth-chart", // 文本水印 直接赋值文本 图片水印时 import对象

  // 线条配置
  gridLineColor: "#333", // 网格线条颜色
  rulerLineColor: "rgb(47,47,47)", // 标尺线条颜色颜色

  // 轴配置0
  xAxisGridSpace: 90, // x轴背景网格间距
  yAxisGridSpace: 30, // y轴背景网格间距
  xAxisFontColor: "#999", // x轴标尺刻度字体颜色
  yAxisFontColor: "#999", // y轴标尺刻度字体颜色
  xAxisFontSize: "12px Aria", // x轴标尺刻度字体大小
  yAxisFontSize: "12px Aria", // y轴标尺刻度字体大小
  yAxisShadowColor: "#333", // y轴标尺刻度阴影颜色

  // 间距配置
  bottomSpace: 8, // 深度图与y轴的间距
  buySellSpace: 10, // 买卖单终点间距

  // 提示框
  tipWidth: 120,
  tipHeight: 60,
  tipLocationLineColor: "#999", // 提示框定位线条颜色
  tipLocationDotRadius: 5, // 提示框圆点半径
  tipType: "mouse", // 鼠标移动提示信息位置 axis(xy轴上) mouse(跟随鼠标位置绝对定位显示)

  // 买 提示框
  tipBuyLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipBuyBorderColor: "#67c23a", // 提示框边框颜色
  tipBuyBgColor: "#f0f9eb", // 提示框背景色
  tipBuyTextColor: "#67c23a", // 提示框提示文字颜色

  // 卖 提示框
  tipSellLocationDotBgColor: "#fff", // 提示框圆点背景颜色
  tipSellBorderColor: "#f56c6c", // 提示框边框颜色
  tipSellBgColor: "#fef0f0", // 提示框背景色
  tipSellTextColor: "#f56c6c", // 提示框提示文字颜色

  // 自定义深度样式配置
  buyStrokeColor: "rgb(111,168,0)", // 买单笔触颜色 rgb(111,168,0)
  sellStrokeColor: "rgb(234,0,112)", // 卖单笔触颜色 rgb(234,0,112)
  buyLinearGradientArray: [
    "rgb(80,120,3)",
    "rgb(72,106,4)",
    "rgb(51,74,5)",
    "rgb(35,49,7)",
    "rgb(20,25,8)",
  ],
  sellLinearGradientArray: [
    "rgb(217,45,127)",
    "rgb(172,37,101)",
    "rgb(115,27,68)",
    "rgb(64,19,39)",
    "rgb(26,13,18)",
  ],
};

export default {
  name: "vue-depth-chart",
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    customizeOptions: {
      type: [Object],
      default() {
        return defaultDayOptions;
      },
    },
    theme: {
      type: String,
      default() {
        return "day";
      },
    },
  },
  data() {
    return {
      options: Object.assign(defaultDayOptions, this.customizeOptions),
      watermask: null,
      watermaskContext: null,
      grid: null,
      gridContext: null,
      depth: null,
      depthContext: null,
      axis: null,
      axisContext: null,
      tip: null,
      tipContext: null,
      pointMap: new Map(),
    };
  },
  watch: {
    data: {
      handler(val) {
        this.pointMap = new Map();
        this.drawDepth(val, this.depthContext, this.options);
        this.drawAxis(val, this.axisContext, this.options);
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    if (this.theme == "night") {
      this.options = Object.assign(defaultNightOptions, this.customizeOptions);
    }
    // 初始化
    this.init();
  },
  destroyed() {
    // 重置
    this.reset();
  },
  methods: {
    // 初始化canvas
    init() {
      this.watermask = this.$refs["watermask"];
      this.watermaskContext = this.getContext2D(this.watermask);
      this.grid = this.$refs["grid"];
      this.gridContext = this.getContext2D(this.grid);
      this.depth = this.$refs["depth"];
      this.depthContext = this.getContext2D(this.depth);
      this.axis = this.$refs["axis"];
      this.axisContext = this.getContext2D(this.axis);
      this.tip = this.$refs["tip"];
      this.tipContext = this.getContext2D(this.tip);
      this.tipContext.translate(
        this.options.initOffset,
        this.options.initOffset
      );

      // 绘制水印
      this.drawWatermask(this.watermaskContext, this.options);
      // 绘制网格线
      this.drawGrid(this.gridContext, this.options);
      // 绘制深度区域
      this.drawDepth(this.data, this.depthContext, this.options);
      // 绘制轴标尺刻度
      this.drawAxis(this.data, this.axisContext, this.options);
    },
    reset() {
      this.watermask = this.tip = this.grid = this.depth = this.axis = null;
      this.watermaskContext = this.tipContext = this.gridContext = this.depthContext = this.axisContext = null;
    },
    // 绘制水印
    drawWatermask(context, options) {
      const { width, height, watermaskType, watermaskContent } = options;

      if (watermaskType == "text") {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.font = "24px Aria";
        context.textAlign = "center";
        context.fillStyle = "rgba(100,100,100,0.3)";
        context.fillText(watermaskContent, width / 2, 50);
        context.closePath();
      } else if (watermaskType == "image") {
        context.beginPath();
        const watermaskImage = new Image();
        watermaskImage.src = watermaskContent;
        watermaskImage.onload = () => {
          context.drawImage(
            watermaskImage,
            (width - watermaskImage.width) / 2,
            10,
            watermaskImage.width,
            watermaskImage.height
          );
        };
        if (this.theme == "night") {
          context.globalAlpha = 1;
        } else {
          context.globalAlpha = 0.2;
        }
        context.closePath();
      }
    },
    // 绘制网格
    drawGrid(context, options) {
      const {
        width,
        height,
        initOffset,
        bgColor,
        xAxisGridSpace,
        yAxisGridSpace,
        gridLineColor,
      } = options;
      context.beginPath();

      // 创建垂直格网线路径
      for (
        let i = initOffset + xAxisGridSpace;
        i < width;
        i += xAxisGridSpace
      ) {
        context.moveTo(i, 0);
        context.lineTo(i, height - yAxisGridSpace); // 不穿出
      }
      // 创建水平格网线路径
      for (
        let j = initOffset + yAxisGridSpace;
        j < height;
        j += yAxisGridSpace
      ) {
        context.moveTo(0, j);
        context.lineTo(width, j);
      }

      // 设置绘制颜色
      context.strokeStyle = gridLineColor;
      // 设置绘制线段的宽度
      context.lineWidth = 1;
      context.fillStyle = bgColor;
      context.fillRect(0, 0, width, height);
      // 绘制格网
      context.stroke();
      context.closePath();
    },
    // 绘制坐标轴
    drawAxis(data, context, options) {
      // 判断是否有对应的深度数组
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        alert("无法渲染坐标刻度，缺少关键数组(买单或卖单)");
        return;
      }
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        xAxisGridSpace,
        yAxisGridSpace,
        rulerLineColor,
        xAxisFontSize,
        yAxisFontSize,
        xAxisFontColor,
        yAxisFontColor,
        yAxisShadowColor,
      } = options;
      const yLen = height - yAxisGridSpace;
      const origin = [0, yLen];
      const allData = this.deepClone(data)
      const buyOriginData = allData["buy"];
      const buyData = buyOriginData.reverse();
      const sellData = data["sell"];
      const buyLen = buyData.length;
      const sellLen = sellData.length;
      const buyBasePrice = buyData[buyLen - 1].price;
      const sellBasePrice = sellData[sellLen - 1].price;
      const buyPriceDiff = buyData[0].price - buyData[buyLen - 1].price;
      const sellPriceDiff = sellData[0].price - sellData[sellLen - 1].price;
      const staticWidth = (width - buySellSpace) / 2; // 单边宽度
      const staticHeight = yLen - bottomSpace;
      const buyTotalAmount = buyData[0].amount; // 买单全部深度数量
      const sellTotalAmount = sellData[0].amount; // 卖单全部深度数量
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // 确定最大高度对应的数量

      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(initOffset, initOffset);
      context.beginPath();

      // 创建水平坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0] + width, origin[1]);

      // 创建垂直坐标轴路径
      context.moveTo(origin[0], origin[1]);
      context.lineTo(origin[0], origin[1] - yLen);

      // 创建y坐标轴的刻度线路径
      for (let i = origin[0] + xAxisGridSpace; i < width; i += xAxisGridSpace) {
        context.moveTo(i, origin[1] - 4);
        context.lineTo(i, origin[1] + 4);
        context.font = xAxisFontSize;
        context.fillStyle = xAxisFontColor;
        // 设置居中
        context.textAlign = "center";

        let number = 0;
        if (i <= staticWidth) {
          number = parseFloat(
            (i / staticWidth) * buyPriceDiff + buyBasePrice
          ).toFixed(2);
        } else if (i > staticWidth + buySellSpace) {
          number = parseFloat(
            ((i - (staticWidth + buySellSpace)) / staticWidth) * sellPriceDiff +
              sellBasePrice
          ).toFixed(2);
        } else {
          number = null;
        }

        // maxWidth 为间距
        context.fillText(number, i, origin[1] + 18, xAxisGridSpace);
      }

      for (
        let j = origin[1] - yAxisGridSpace;
        j > origin[1] - yLen;
        j -= yAxisGridSpace
      ) {
        context.moveTo(origin[0] - 4, j);
        context.lineTo(origin[0] + 4, j);
        context.font = yAxisFontSize;
        context.fillStyle = yAxisFontColor;
        context.textAlign = "left";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = yAxisShadowColor;

        const number = parseFloat(
          ((staticHeight - j) / staticHeight) * totalAmount
        ).toFixed(2);

        context.fillText(number, origin[0] + 6, j + 4);
      }

      // 设置绘制颜色
      context.strokeStyle = rulerLineColor;
      // 设置绘制线段的宽度
      context.lineWidth = 1;
      // 绘制坐标轴
      context.stroke();
      context.closePath();
      context.restore();
    },
    // 绘制主深度图
    drawDepth(data, context, options) {
      // 判断是否有对应的深度数组
      if (
        !Object.prototype.hasOwnProperty.call(data, "buy") ||
        !Object.prototype.hasOwnProperty.call(data, "sell")
      ) {
        alert("无法渲染深度图，缺少关键数组(买单或卖单)");
        return;
      }
      // 初始化基本数据
      const {
        width,
        height,
        initOffset,
        bottomSpace,
        buySellSpace,
        yAxisGridSpace,
        buyLinearGradientArray,
        sellLinearGradientArray,
      } = options;
      const allwidth = width; // 整体宽度
      const allheight = height - yAxisGridSpace;
      const staticWidth = (allwidth - buySellSpace) / 2; // 固定单边宽度
      const staticHeight = allheight - bottomSpace;
      const buyPoint = [],
        sellPoint = [];
      const allData = this.deepClone(data)
      const buyOriginData = allData["buy"];
      const buyData = buyOriginData.reverse();
      const sellData = data["sell"];
      const buyLen = buyData.length;
      const sellLen = sellData.length;

      const buyEndOrigin = { x: staticWidth, y: staticHeight }; // 买单画笔终点
      const sellEndOrigin = { x: staticWidth + buySellSpace, y: staticHeight }; // 卖单画笔终点
      const buyStartOrigin = { x: 0, y: staticHeight }; // 买单画笔边缘起点
      const sellStartOrigin = { x: width, y: staticHeight }; // 卖单画笔边缘起点
      const buySidePrice = buyData[0].price; // 买单边缘价格
      const sellSidePrice = sellData[0].price; // 买单边缘价格
      const buyTotalAmount = buyData[0].amount; // 买单全部深度数量
      const sellTotalAmount = sellData[0].amount; // 卖单全部深度数量
      const totalAmount = Math.max(buyTotalAmount, sellTotalAmount); // 确定最大高度对应的数量
      const buyMaxPriceDiff = buyData[buyLen - 1].price - buyData[0].price; // 买单最大价差
      const sellMaxPriceDiff = sellData[0].price - sellData[sellLen - 1].price; // 卖单最大价差
      let pointList = [];
      // 添加买单画点 并确保坐标点均为整数
      buyData.forEach((item, index) => {
        const x = Math.round(
          ((item.price - buySidePrice) / buyMaxPriceDiff) * staticWidth
        );
        const y = Math.round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        buyPoint.push({ x, y });

        if (buyData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - buyData[index + 1].amount) / totalAmount) *
              staticHeight
          );
          buyPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "buy", value: item });
      });
      // 添加卖单画点 并确保坐标点均为整数
      sellData.forEach((item, index) => {
        const x = Math.round(
          width -
            ((sellSidePrice - item.price) / sellMaxPriceDiff) * staticWidth
        );
        const y = Math.round(
          ((totalAmount - item.amount) / totalAmount) * staticHeight
        );
        sellPoint.push({ x, y });
        // 下落点
        if (sellData[index + 1]) {
          const yDrop = Math.round(
            ((totalAmount - sellData[index + 1].amount) / totalAmount) *
              staticHeight
          );
          sellPoint.push({ x, y: yDrop });
        }
        pointList.push({ x, y, side: "sell", value: item });
      });
      pointList = pointList.sort((a, b) => {
        return a.x - b.x;
      });
      pointList.forEach((item) => {
        this.pointMap.set([item.x, item.y, item.side], item.value);
      });

      buyPoint.push(buyEndOrigin);
      buyPoint.push(buyStartOrigin);
      sellPoint.push(sellEndOrigin);
      sellPoint.push(sellStartOrigin);
      // 初始化中心偏移，确保无锯齿化地画线
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(initOffset, initOffset);
      context.lineWidth = 1; // 因为已经中心偏移，所以不需要设为0.5，设为0.5又会产生锯齿
      context.lineJoin = "bevel"; // 线条和线条相交的时候所呈现出的形态设为"斜接（不会延长形成尖角）"

      // 买单笔触画线
      context.beginPath();
      // 设置买单渐变填充和笔触颜色
      const buyLinearGradient = context.createLinearGradient(
        0,
        0,
        0,
        staticHeight
      );
      buyLinearGradient.addColorStop(0, buyLinearGradientArray[0]);
      buyLinearGradient.addColorStop(0.3, buyLinearGradientArray[1]);
      buyLinearGradient.addColorStop(0.5, buyLinearGradientArray[2]);
      buyLinearGradient.addColorStop(0.8, buyLinearGradientArray[3]);
      buyLinearGradient.addColorStop(1, buyLinearGradientArray[4]);
      context.strokeStyle = this.options.buyStrokeColor;
      context.fillStyle = buyLinearGradient;
      // 连接对应的点
      buyPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== buyPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();

      // 卖单笔触画线
      context.beginPath();
      // 设置卖单渐变填充和笔触颜色
      const sellLinearGradient = context.createLinearGradient(0, 0, 0, height);
      sellLinearGradient.addColorStop(0, sellLinearGradientArray[0]);
      sellLinearGradient.addColorStop(0.3, sellLinearGradientArray[1]);
      sellLinearGradient.addColorStop(0.5, sellLinearGradientArray[2]);
      sellLinearGradient.addColorStop(0.8, sellLinearGradientArray[3]);
      sellLinearGradient.addColorStop(1, sellLinearGradientArray[4]);
      context.fillStyle = sellLinearGradient;
      context.strokeStyle = this.options.sellStrokeColor;
      // 连接对应的点
      sellPoint.forEach((item, index) => {
        context.lineTo(item.x, item.y);
        if (index !== sellPoint.length - 1) {
          context.stroke();
        }
      });
      context.fill();
      context.closePath();

      context.restore();
    },
    onMouseMove({ offsetX }) {
      const pointMap = this.pointMap;
      const tipContext = this.tipContext;
      const {
        tipType,
        tipHeight,
        tipLocationLineColor,
        tipLocationDotRadius,
        tipBuyLocationDotBgColor,
        tipBuyBorderColor,
        tipBuyBgColor,
        tipBuyTextColor,
        tipSellLocationDotBgColor,
        tipSellBorderColor,
        tipSellBgColor,
        tipSellTextColor,
        yAxisGridSpace,
        initOffset,
      } = this.options;
      let { tipWidth } = this.options;
      const width = this.options.width;
      const height = this.options.height - yAxisGridSpace;
      for (let key of pointMap.keys()) {
        const x = key[0];
        const y = key[1];
        const side = key[2];
        const obj = pointMap.get(key);
        if (offsetX < x) {
          // 先清空
          tipContext.clearRect(-10, -10, width + 20, this.options.height + 20);
          // 绘制定位虚线
          tipContext.strokeStyle = tipLocationLineColor;
          tipContext.lineWidth = 1;
          tipContext.setLineDash([2]);
          tipContext.beginPath();
          tipContext.moveTo(0, y);
          tipContext.lineTo(width, y);
          tipContext.stroke();
          tipContext.closePath();
          tipContext.beginPath();
          tipContext.moveTo(x, 0);
          tipContext.lineTo(x, height);
          tipContext.stroke();
          tipContext.closePath();

          // 绘制小圆点
          tipContext.beginPath();
          tipContext.lineWidth = 1;
          tipContext.setLineDash([]);
          tipContext.fillStyle =
            side === "buy"
              ? tipBuyLocationDotBgColor
              : tipSellLocationDotBgColor;
          tipContext.strokeStyle =
            side === "buy" ? tipBuyBorderColor : tipSellBorderColor;
          tipContext.arc(x, y, tipLocationDotRadius, 0, 2 * Math.PI);
          tipContext.fill();
          tipContext.stroke();
          tipContext.closePath();

          // 绘制提示框
          if (tipType === "mouse") {
            tipContext.beginPath();
            tipContext.fillStyle =
              side === "buy" ? tipBuyBgColor : tipSellBgColor;
            tipContext.font = "12px bold";
            let left = x - tipWidth / 2;
            let top = y - tipHeight - 10;
            const tipsPriceText = `委托价格 ${this.toThousand(obj.price)}`;
            const tipsAmountText = `委托总量 ${this.toThousand(obj.amount)}`;
            const maxTextWidth = Math.max(
              tipContext.measureText(tipsPriceText).width,
              tipContext.measureText(tipsAmountText).width
            );
            if (maxTextWidth + 20 > tipWidth) {
              tipWidth = maxTextWidth + 20;
            }
            if (left < initOffset) {
              left = initOffset;
            }
            if (left >= width - tipWidth) {
              left = width - tipWidth;
            }
            if (top <= 0) {
              top = y + 10;
            }
            tipContext.lineWidth = 1;
            tipContext.setLineDash([2]);
            tipContext.lineJoin = "round";
            tipContext.strokeStyle =
              side === "buy" ? tipBuyBorderColor : tipSellBorderColor;
            this.drawRoundedRect(
              tipContext,
              left,
              top,
              tipWidth,
              tipHeight,
              5,
              false,
              true
            );
            tipContext.fillStyle =
              side === "buy" ? tipBuyBgColor : tipSellBgColor;
            tipContext.fill();

            // tipContext.fillRect(left, top, tipWidth, tipHeight);
            tipContext.fillStyle =
              side === "buy" ? tipBuyTextColor : tipSellTextColor;
            tipContext.textAlign = "left";
            tipContext.shadowBlur = 0;
            const marginLeft = 10;
            const marginTop = 25;
            const lineHeight = 20;
            tipContext.fillText(
              tipsPriceText,
              left + marginLeft,
              top + marginTop
            );
            tipContext.fillText(
              tipsAmountText,
              left + marginLeft,
              top + marginTop + lineHeight
            );
            tipContext.closePath();
          } else {
            const tipsPriceText = `${this.toThousand(obj.price)}`;
            const tipsAmountText = `${obj.amount}`;
            const tipsPriceWidth =
              tipContext.measureText(tipsPriceText).width + 20;
            const tipsAmountWidth =
              tipContext.measureText(tipsAmountText).width + 15;
            const lineHeight = 20;
            // 绘制x轴上的提示框
            tipContext.beginPath();
            tipContext.fillStyle = "#fff";
            tipContext.lineWidth = 1;
            tipContext.lineJoin = "round";
            tipContext.strokeStyle = "#e6a23c";
            tipContext.moveTo(x, height);
            tipContext.lineTo(x - 5, height + 5);
            tipContext.lineTo(x - tipsPriceWidth / 2, height + 5);
            tipContext.lineTo(x - tipsPriceWidth / 2, height + 5 + lineHeight);
            tipContext.lineTo(x + tipsPriceWidth / 2, height + 5 + lineHeight);
            tipContext.lineTo(x + tipsPriceWidth / 2, height + 5);
            tipContext.lineTo(x + 5, height + 5);
            tipContext.lineTo(x, height);
            if (this.theme == "night") {
              tipContext.fillStyle = "rgb(25,25,25)";
            } else {
              tipContext.fillStyle = "#fff";
            }
            tipContext.fill();
            tipContext.stroke();
            if (this.theme == "night") {
              tipContext.fillStyle = "#ccc";
            } else {
              tipContext.fillStyle = "#666";
            }
            tipContext.font = "12px bold";
            tipContext.textAlign = "center";
            tipContext.fillText(tipsPriceText, x, height + 19);
            tipContext.closePath();
            // 绘制y轴上的提示框
            tipContext.beginPath();
            tipContext.fillStyle = "#fff";
            tipContext.lineWidth = 1;
            tipContext.lineJoin = "round";
            tipContext.strokeStyle = "#e6a23c";
            tipContext.moveTo(1, y);
            tipContext.lineTo(8, y - 10);
            tipContext.lineTo(8 + tipsAmountWidth, y - 10);
            tipContext.lineTo(8 + tipsAmountWidth, y + 10);
            tipContext.lineTo(8, y + 10);
            tipContext.lineTo(1, y);
            if (this.theme == "night") {
              tipContext.fillStyle = "rgb(25,25,25)";
            } else {
              tipContext.fillStyle = "#fff";
            }
            tipContext.fill();
            tipContext.stroke();
            if (this.theme == "night") {
              tipContext.fillStyle = "#ccc";
            } else {
              tipContext.fillStyle = "#666";
            }
            tipContext.font = "12px bold";
            tipContext.textAlign = "center";
            tipContext.fillText(tipsAmountText, 30, y + 4, tipsAmountWidth);
            tipContext.closePath();
          }

          break;
        }
      }
    },
    onMouseOut() {
      const { width, height } = this.options;
      this.tipContext.clearRect(0, 0, width, height);
    },
    drawRoundedRect(context, x, y, width, height, r, fill, stroke) {
      context.moveTo(x + r, y);
      context.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
      context.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
      context.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
      context.arcTo(x, y, x + r, y, r);
      if (fill) {
        context.fill();
      }
      if (stroke) {
        context.stroke();
      }
    },
    getContext2D(elem) {
      // 判断是否为canvas
      if (elem && elem.nodeType && elem.nodeType == 1) {
        return elem.getContext("2d");
      }
      return null;
    },
    // 数字用逗号分隔
    toThousand(num = 0) {
      if (typeof num === "undefined") {
        return 0;
      }
      return (num || 0).toString().replace(/\d+/, function (n) {
        var len = n.length;
        if (len % 3 === 0) {
          return n.replace(/(\d{3})/g, ",$1").slice(1);
        } else {
          return (
            n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ",$1")
          );
        }
      });
    },
    deepClone(obj) {
      if (obj instanceof RegExp) return new RegExp(obj);
      if (obj instanceof Date) return new Date(obj);
      if (obj === null || typeof obj !== "object") return obj; //如果不是引用类型则直接返回
      let newObj = new obj.constructor(); //如果obj是数组，newObj=[];如果obj是对象，newObj={}
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          //是否是自身的对象
          newObj[key] = this.deepClone(obj[key]); //赋值
        }
      }
      return newObj;
    },
  },
};
</script>

<style scoped>
.content-wrap {
  position: relative;
}
canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>