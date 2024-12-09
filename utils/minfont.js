import Fontmin from 'fontmin';

export function minFont(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // to: ['woff', 'svg', 'eot', 'ttf', 'css']
      const { src, dest, text, fontName, to = ['woff', 'svg', 'eot', 'ttf', 'css'] } = options;
      console.log('minFont options ->', src, dest, fontName, to);

      const fontmin = new Fontmin().src(src).dest(dest)
      fontmin.use(Fontmin.glyph({
        text: text,
        hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
      }))
      if (to.includes('ttf')) {
      }
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
      }
      if (to.includes('css')) {
        fontmin.use(Fontmin.css({
          fontFamily: fontName,
          base64: false,
          // glyph: true,            // generate class for each glyph. default = false
          // iconPrefix: 'my-icon',  // class prefix, only work when glyph is `true`. default to "icon"
          // fontFamily: 'myfont',   // custom fontFamily, default to filename or get from analysed ttf file
          // asFileName: false,      // rewrite fontFamily as filename force. default = false
          // local: true             // boolean to add local font. default = false
        }))
      }

      fontmin.run((err, files) => {
          if (err) {
            console.error(err);
            return reject(e);
            // throw err;
          }
          console.log(files);
          return resolve(files)
          // => { contents: <Buffer 00 01 00 ...> }
      });
    } catch (e) {
      return reject(e);
    }
  })

}