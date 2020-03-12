const express: any = require('express')
const app: any = express()
const Vue: any = require('vue')
const path: any = require('path')
const fs: any = require('fs');
const VueServerRenderer: any = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8'),
})

const vueApp: Object = new Vue({
  data() {
    return {
      message: 'test_message,中文测试'
    }
  },
  template: `
    <div>{{message}}</div>
  `
})
app.get('*', (req, res) => {
  res.status(200)
  res.setHeader('Content-Type', 'text/html;charset=utf-8;')
  VueServerRenderer.renderToString(vueApp).then((html) => {
    res.end(html)
  }).catch((err) => {
    console.log(err);
  })
})

const port: number = 4000

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
})
