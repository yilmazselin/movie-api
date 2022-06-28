const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const index = require('./routers/index');
const movie = require('./routers/movie');
const { appendFile } = require('fs');
const { compareSync } = require('bcrypt');
const app = express();
const port = 3000;
const db = require('./helper/db.js')();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
    res.send("respond with a resource");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.use('/api/movie', movie);
// app.use('/api/movie', movie);


//eror handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: { message: err.message, code: err.code } });
});


module.exports = app;