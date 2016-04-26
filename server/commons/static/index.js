import fs from 'fs';

export default class StaticDispatcher {
    static loadPage(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/index.html')
        .pipe(res);
    }

}
