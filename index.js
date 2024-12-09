
import * as Texts from './constants/index.js';
import { minFont } from './utils/minfont.js'
import path from 'path';

minFont({
  src: './fonts/*.ttf',
  dest: path.resolve('./build'),
  text: Texts.NORMAL_2000_ALL,
  fontName: 'fontName',
})
