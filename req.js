const http = require('http');

http.get('http://localhost', (req, res) => {
  console.log('req', req)
  console.log('res', res)
});