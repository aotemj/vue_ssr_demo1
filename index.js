const express = require('express')
const app = express()
const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer').createRenderer()

const vueApp = new Vue({
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

const port = 4000
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
})
