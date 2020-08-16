const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');
const port = 3000;

app.get('/', (req, res) => {
    res.render("index", {
        title: "Index"
    });
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`PS Project Running on port 3000!`)
});

// app.listen(3000,'0.0.0.0',function(){
//   console.log('Server running at http://127.0.1.1:3000/')
// });

// app.listen(port, "localhost", function(error) {
//   if (error) {
//     console.error("Unable to listen on port", port, error);
//     listen(port + 1);
//     return;
//   }
//   console.log('Server running at http://127.0.1.1:3000/');
// });