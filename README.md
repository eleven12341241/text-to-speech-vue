# 文本转语音

[![NPM version](https://camo.githubusercontent.com/f93a08d362d2b3b30264e81d9391d4d02bfec6d7dec4bd866534f073fe851965/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6f70656e61692e737667)](https://npmjs.org/package/openai)

这个项目根据openai的[api](https://platform.openai.com/docs/guides/text-to-speech)将文本转换成语音的demo

## 安装

```shell
npm install
# or
yarn install
```

## 运行

首先在根目录的.env文件中，将你的openai key 复制粘贴到OPENAI_API_KEY中，然后运行

```shell
npm run start
```

## 使用方法

* 选择想要的语音风格
* 输入待转换的文本
* 点击create即可

![image-20231113180716691](./public/index.png)



## 版本

支持以下运行时：

* Node.js 18 LTS 或更高版本（[非 EOL](https://endoflife.date/nodejs)）。
* TypeScript >= 4.5。









