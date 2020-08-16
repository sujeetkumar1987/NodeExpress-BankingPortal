const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');
const port = 3000;

const {accounts,users,writeJSON}=require('./data');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

// const accountData= fs.readFileSync(
//   path.join(__dirname,'json','accounts.json'),'utf8'
// );
// const accounts=JSON.parse(accountData);

// const userData= fs.readFileSync(
//   path.join(__dirname,'json','users.json'),'utf8'
// );
// const users=JSON.parse(userData);

app.get('/', (req, res) => {
  res.render("index", {
      title: "Account Summary",accounts
  });
});

app.get('/savings', (req, res) => {
  res.render("account", {
      account: accounts.savings
  });
});
app.get('/checking', (req, res) => {
  res.render("account", {
    account: accounts.checking
  });
});
app.get('/credit', (req, res) => {
  res.render("account", {
    account: accounts.credit
  });
});

app.get('/transfer', (req, res) => {
  res.render("transfer");
});

app.post('/transfer', (req, res) => {
 accounts[req.body.from].balance=accounts[req.body.from].balance- req.body.amount;
 accounts[req.body.to].balance=parseInt(accounts[req.body.to].balance)+ parseInt(req.body.amount,10);
//  const accountsJSON=JSON.stringify(accounts,null,4);
//  fs.writeFileSync(path.join(__dirname,'json/accounts.json'),accountsJSON,'utf8');
writeJSON(); 
res.render("transfer",{message:'Transfer Completed'});
});
app.get('/payment', (req, res) => {
  res.render("payment",{account:accounts.credit});
});

app.post('/payment', (req, res) => {
 accounts.credit.balance -= req.body.amount;
 accounts.credit.available += parseInt(req.body.amount,10);
 writeJSON();
//  const accountsJSON=JSON.stringify(accounts,null,4);
//  fs.writeFileSync(path.join(__dirname,'json','accounts.json'),accountsJSON,'utf8');
 res.render('payment',{message:'payment successfull',account:accounts.credit});
});
app.get('/profile', (req, res) => {
  res.render("profile", {
    user:users[0]
  });
});
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