let express = require('express');
let app =  express();

app.use(express.static(__dirname+'/dist/neoja/browser'));

app.get('/*', (req,res)=>{
    res.sendFile(__dirname+'/dist/neoja/browser/index.html')
});

app.listen(process.env.PORT || 8080);