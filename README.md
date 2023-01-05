## 简介
vue-cli-plugin-simplehtmllayout希望对使用Vue CLI工具进行开发的人士，能够进行静态页面的快速布局，达到提高开发效率的目的  

## 举例
.vue文件内容如下
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
## 如何安装
1.使用npm安装vue-cli-plugin-simplehtmllayout  
```
npm install vue-cli-plugin-simplehtmllayout --save-dev
```

## 如何使用
1.在vue.config.js文件内添加以下内容  
```
  chainWebpack: config => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("simpleHtmlLayout")
      .loader("vue-cli-plugin-simplehtmllayout")
      .end();
  },
```  

2.在.vue文件内任意区域添加**simplehtmllayout**单词，过滤器会对文件内容进行过滤，含有**simplehtmllayout**字样的文件会进行快速布局   

3.支持width,height样式快速布局,支持class属性  
width-number1,height-number2  
对应的属性为  
{width:number1px;}    
{height:number2px;}  

4.支持position样式快速布局,position支持**relative**,**absolute**,**fixed**,**sticky**;支持class属性  
position-number1-number2-number3-number4-number5,  
number若为0则不进行样式填写,对应的属性为  
position-top-right-bottom-left-zindex样式，  
例如：{position:relative;top:number1px;right:number2px;bottom:number3px;left:number4px;z-index:number5}  

5.支持margin和padding快速布局,支持class属性  
margin-number1,  
margin-number1-number2,  
margin-number1-number2-number3,  
margin-number1-number2-number3-number4,  
分别对应的属性  
{margin:number1px;}  
{margin:number1px number2px;}  
{margin:number1px number2px number3px;}  
{margin:number1px number2px number3px number4px;}  
padding类似  

