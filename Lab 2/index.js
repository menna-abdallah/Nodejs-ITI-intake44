const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if ((req.url === '/' || req.url === '/home') && req.method === "GET") {
    const todopath = path.join(__dirname, 'data.json')
    const readStream = fs.createReadStream(todopath, 'utf8');
    let todos = "";

    readStream.on('data', (chunk) => {
      todos += chunk;
    });

    readStream.on('end', () => {
      const todolist = JSON.parse(todos);
      const home = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="./styles/home.css">
            <title>Document</title>
        </head>
        <body>
            <div id="container">
            <ul>
            ${todolist.map(todo => `<li> <input class="check" type="checkbox">${todo.title}</li>`).join('')}
        </ul>
    </div>
    <script>
      const checkboxes = document.querySelectorAll('.check');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          if (this.checked) {
            this.parentElement.style.textDecoration = "line-through";
          } else {
            this.parentElement.style.textDecoration = "none";
          }
        });
        
      });
    </script>
        </body>
        </html>
      `;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(home);
    });
  } else if (req.url === '/astronomy' && req.method === "GET") {
    const currentpath = path.join(__dirname, 'pages', 'astronomy.html')
    const readStream = fs.createReadStream(currentpath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readStream.pipe(res);
  }
  else if (req.url === '/styles/home.css') {
    const currentpath = path.join(__dirname, 'styles', 'home.css')
    const readStream = fs.createReadStream(currentpath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    readStream.pipe(res);
  }
  else if (req.url === '/styles/austronomy.css') {
    const currentpath = path.join(__dirname, 'styles', 'austronomy.css')
    const readStream = fs.createReadStream(currentpath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    readStream.pipe(res);
  }
  else if (req.url === "/photo.jpg") {
    const currentpath = path.join(__dirname, 'photo.jpg')
    const readStream = fs.createReadStream(currentpath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    readStream.pipe(res);
  }
  else {
    const currentpath = path.join(__dirname, 'pages', 'notfound.html')
    const readStream = fs.createReadStream(currentpath);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    readStream.pipe(res);
  }
});

server.listen(3000, () => {
  console.log("Server is running at 3000 port");
});
