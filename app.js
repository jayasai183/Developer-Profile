const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const path=require('path');
const api=require("./Server/api");

app.use('/api',api);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
})