const express = require('express');

const routes = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => { // middle ware // next is necessary // global
  console.log('Received Successfully');
  next();
});

app.set('view engine', 'pug');
app.use(routes);
app.use(express.static('./public'));
app.use((req, res) => {
  res.status(404).send('Page Not Found.');
});
app.use((req, res) => {
  console.log('End Request');
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
