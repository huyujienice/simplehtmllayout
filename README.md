## 简介

simplehtmllayout 希望对使用 Vue CLI 工具进行开发的人士，能够进行静态页面的快速布局，达到提高开发效率的目的

## 举例

.vue 文件内容如下

```
<template simplehtmllayout>
  <div class="home">
    <h1>home page</h1>
    <template>
      <div class="w-100 h-100 relative-100-0-0-200 margin-20"></div>
    </template>
    <div class="w-300 h-200 fixed-0-200-300-0-2 padding-10-20-30-40"></div>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.home {
background-color: aqua;
}
</style>
```

将会被处理成

```
<template simplehtmllayout>
  <div class="home">
    <h1>home page</h1>
    <template>
      <div class="w-100 h-100 relative-100-0-0-200 margin-20"></div>
    </template>
    <div class="w-300 h-200 fixed-0-200-300-0-2 padding-10-20-30-40"></div>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.home {
background-color: aqua;
}

.w-100 {
width:100px;
}

.w-300 {
width:300px;
}

.h-100 {
height:100px;
}

.h-200 {
height:200px;
}

.relative-100-0-0-200 {
position:relative;
top:100px;
left:200px;
}

.fixed-0-200-300-0-2 {
position:fixed;
right:200px;
bottom:300px;
z-index:2;
}

.margin-20 {
margin:20px;
}

.padding-10-20-30-40 {
padding:10px 20px 30px 40px;
}
</style>
```

## 安装

1.对于使用 Vue CLI 构建的项目来说,直接在项目根目录执行命令

```
vue add vue-cli-plugin-simplehtmllayout
```

## 使用

1.在.vue 文件内任意区域添加**simplehtmllayout**单词，过滤器会对文件内容进行过滤，含有**simplehtmllayout**字样的文件会进行快速布局

2.支持 width,height 样式快速布局,支持 class 属性  
width-number1,height-number2  
对应的属性为  
{width:number1px;}  
{height:number2px;}

3.支持 position 样式快速布局,position 支持**relative**,**absolute**,**fixed**,**sticky**;支持 class 属性  
position-number1-number2-number3-number4-number5,  
number 若为 0 则不进行样式填写,对应的属性为  
position-top-right-bottom-left-zindex 样式，  
例如：{position:relative;top:number1px;right:number2px;bottom:number3px;left:number4px;z-index:number5}

4.支持 margin 和 padding 快速布局,支持 class 属性  
margin-number1  
margin-number1-number2  
margin-number1-number2-number3  
margin-number1-number2-number3-number4  
分别对应的属性  
{margin:number1px;}  
{margin:number1px number2px;}  
{margin:number1px number2px number3px;}  
{margin:number1px number2px number3px number4px;}  
padding 类似

## 提示

### 支持有效负数及小数

### 支持配置传入 css 布局单位(cssUnit)

例如：

#### 想在 uni-app 框架中使用，必须：

1.命令行安装 simplehtmllayout  
2.手动在 vue.config.js 中添加

```
module.exports = {
    chainWebpack: config => {
        config.module
            .rule("vue")
            .test(/\.vue$/)
            .use("simplehtmllayout")
            .loader("simplehtmllayout")
            .options({ cssUnit: "rpx" });
    }
};
```

#### 想在 VUE CLI 项目内使用别的 css 布局单位（例如：vw）,必须：

1.命令行安装 simplehtmllayout  
2.手动在 vue.config.js 中添加

```
  chainWebpack: config => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("simplehtmllayout")
      .loader("simplehtmllayout")
      .options({ cssUnit: "vw" });
  }
```
