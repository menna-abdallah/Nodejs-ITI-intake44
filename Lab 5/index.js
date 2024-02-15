const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/iti2_osad_44'
mongoose.connect(mongoURL)
  .then(console.log('connected succefully'));

app.use(routes);

app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message });
});

app.use('*', (req,res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
