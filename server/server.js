const express = require('express');
const routes  = require('./route/main.route');


const app = express();
app.use(express.json());
app.use(routes);

app.use(function(error, req,res, next) {

    console.log(error);
    if(error.message === 'Task not found') {
         return res.status(404).send(error.message);
    }

    if(error.message === 'Task already exists') {
        return  res.status(409).send(error.message);
    }

    res.status(500).send(error.message);
    
});


app.listen(3000, () => {
    console.log('app running in port 3000');
});
