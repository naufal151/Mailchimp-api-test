const express = require("express");
const requests = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/sign.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/239aaf993b";
  const options = {
    method: "POST",
    auth: "naufal151:547c9101994b5dcfc07608d39ecd9174-us7"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + '/fail.html');
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

app.listen(process.env.PORT || 8000, function(){
  console.log("Server running on port 8000");
});


// api key
// 547c9101994b5dcfc07608d39ecd9174-us7
// id
// 239aaf993b
