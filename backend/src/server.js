//Install Express
const express = require('express');
const cors = require('cors');
const app = express();
const hamstersRouter = require('../src/routes/hamsters.js');

//Configure server
const PORT = process.env.PORT || 1337;
let requestCount = 0;

//Middleware
app.use( cors() )
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( (req, res, next) => {
    requestCount++
    console.log(`${requestCount}, Method: ${req.method}, Request URL: ${req.url}`, req.body)
    next();
})
//app.use( express.static() )

//Endpoints
app.use('/hamsters', hamstersRouter);

//Start server
app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}...`);
})

