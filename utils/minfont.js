import Fontmin from 'fontmin';
import fs from 'fs'
import path from 'path';

export function minFont(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // to: ['woff', 'svg', 'eot', 'ttf', 'css']
      const { src, dest, text, fontName, to = ['woff', 'svg', 'eot', 'ttf', 'css'], isDel } = options;
      console.log('minFont options ->', src, dest, fontName, to, text.length, isDel);

      const fontmin = new Fontmin().src(src).dest(dest)
      fontmin.use(Fontmin.glyph({
        text: text,
        hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
      }))
      if (src.includes('otf')) {
        fontmin.use(Fontmin.otf2ttf());
      } else {
        if (to.includes('eot')) {
          fontmin.use(Fontmin.ttf2eot());
        }
        if (to.includes('svg')) {
          fontmin.use(Fontmin.ttf2svg());
        }
        if (to.includes('woff')) {
          fontmin.use(Fontmin.ttf2woff({
            deflate: true // deflate woff. default = false
          }))
          .use(Fontmin.ttf2woff2())
        }
        if (to.includes('css')) {
          fontmin.use(Fontmin.css({
            fontFamily: fontName || function(fontInfo, ttf) {
              return fontInfo.fontFile
            },
            base64: false,
            // glyph: true,            // generate class for each glyph. default = false
            // iconPrefix: 'my-icon',  // class prefix, only work when glyph is `true`. default to "icon"
            // fontFamily: 'myfont',   // custom fontFamily, default to filename or get from analysed ttf file
            // asFileName: false,      // rewrite fontFamily as filename force. default = false
            // local: true             // boolean to add local font. default = false
          }))
        }
      }

      fontmin.run((err, files) => {
          if (err) {
            console.error(err);
            return reject(e);
            // throw err;
          }
          console.log(files);
          if (isDel) {
            delFile(src)
          }
          return resolve(files)
          // => { contents: <Buffer 00 01 00 ...> }
      });
    } catch (e) {
      return reject(e);
    }
  })
}

export function delFile(src) {
  if (src.includes('*')) return console.log('文件包含*, 正则匹配, 无法删除');;
  const filePath = path.resolve(src)
  // 检查文件是否存在
  if (fs.existsSync(filePath)) {
    // 文件存在，进行删除
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('删除文件失败:', err);
      } else {
        console.log('文件已删除', filePath);
      }
    });
  } else {
    console.log('文件不存在', filePath);
  }
}