
import * as Texts from './constants/index.js';
import { minFont } from './utils/minfont.js'
import path from 'path';

let type;
const args = process.argv.slice(2);  // 获取从第三个位置开始的参数
// 查找 --type 参数
args.forEach(arg => {
  const [key, value] = arg.split('=')
  if (key === '--type') type = value
})

console.log('args type:', type);  // 输出获取到的 type 值

minFont({
  src: './fonts/*.ttf',
  dest: path.resolve('./build'),
  text: type == '7000' ? Texts.NORMAL_7000 : 
    type == '3500' ? Texts.NORMAL_3500_ALL : 
    Texts.NORMAL_2000_ALL,
  // fontName: 'fontName',
  // src: './fonts/test.ttf',
  // isDel: true
})
