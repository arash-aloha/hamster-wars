//Install Express
const express = require('express');
const app = express();
const hamstersRouter = require('../src/routes/hamsters.js');

//Configure server
const PORT = process.env.PORT || 1337;
let requestCount = 0;

//Middleware
app.use((req, res, next) => {
    requestCount++
    console.log(`${requestCount}, Method: ${req.method}, Request URL: ${req.url}`, res.body)
    next();
})

//Endpoints
app.use('/hamsters', hamstersRouter);

//Start server
app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}...`);
})

