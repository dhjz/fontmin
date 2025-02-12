## 前端字体压缩转换工具
### 依赖
- fontmin@2.0.0 ( `Node v16+` )
### 安装依赖
```
npm install
```
### 使用方法
1. 字体复制到fonts目录
2. 执行 `node index.js` 转换常见2000汉字
3. 执行 `node index.js --type=3000` 转换常见3000汉字
4. 执行 `node index.js --type=7000` 转换常见7000汉字
5. 生成字体文件在build目录
### 支持格式
- 源格式: `ttf`
- 目标格式: `woff`, `svg`, `eot`, `ttf`, `css`, `woff2`