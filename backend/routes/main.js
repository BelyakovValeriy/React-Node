// routing main /
const fs = require("fs") // модуль файловые системы

module.exports = function (app) {
  function isFolder(path) {
    return fs.lstatSync(path).isDirectory() && fs.existsSync(path)
  }

  app.get("/", (req, res) => {
    const base = "./files/"
    let path = ""

    if ("path" in req.query) {
      path = req.query.path
    }

    if (isFolder(base + path)) {
      // если переданный параметр - папка
      let files = fs.readdirSync(base + path).map((item) => {
        const isDir = fs.lstatSync(base + path + "/" + item).isDirectory()
        let size = 0
        if (!isDir) {
          size = fs.statSync(base + path + "/" + item)
          console.log(size.size)
        }

        return {
          name: item,
          dir: isDir,
          size: size.size ?? 0,
        }
      })
      res.json({
        path: path,
        result: true,
        files: files,
      })
    }
  })
}
