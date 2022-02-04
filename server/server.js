const express = require('express');
const cors = require('cors');
const routes = require('./route/main.route');



const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


app.use(function (error, req, res, next) {


    console.log(error);
    if (error.message === 'Task not found') {
        return res.status(404).json({status: 404, message:error.message});
    }

    if (error.message === 'Task already exists') {
        return res.status(409).json({status: 409, message: error.message});
    }

    res.status(500).json({status: 500, message:error.message});

});


app.listen(3000, () => {
    console.log('app running in port 3000');
});
