const express = require('express');

const bodyParser = require('body-parser');


const app = express();

const postsRoute= require('./routes/post');
const userRoute= require('./routes/userSign');
const commentsRoute = require('./routes/comments');
const testRoutes = require('./routes/test');

app.use(bodyParser.json());

app.use("/posts",postsRoute);
app.use("/user",userRoute);
app.use("/comments", commentsRoute);
app.use("/test", testRoutes);



module.exports = app