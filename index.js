// @ts-nocheck
const http = require('http');
const url = require('url');
const fs = require('fs');

const router = {
  '/api/test': (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8'
    })
    res.write(JSON.stringify({
      code: 0,
      data: { status: 'R U OK?' },
      msg: 'hello',
    }));
    res.end()
  },
  '/api/login': (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'set-cookie': 'JSESSION=0000',
    })
    res.write(JSON.stringify({
      code: 0,
      data: { status: 'R U OK?' },
      msg: '登录成功',
    }));
    res.end()
  }
}

function start() {
  
  const onRequest = (req, res) => {
    // const pathname = req.url;
    console.log('req.url', req.url)
    const { pathname } = new URL(`http://xx.com${req.url}`)
    console.log('pathname', pathname)
    if (typeof router[pathname] === 'function') {
      router[pathname](req, res)
    } else {
      const htmlBuffer = fs.readFileSync('./index.html')
      res.write(htmlBuffer.toString())
      res.end()
    }
  }

  http.createServer(onRequest).listen(80);
  console.log('http start 80')
}

start();
