var path = require("path"),
  mailer = require("./lib/mailer"),
  generateDineroMailUrl = require("./lib/dineromail");

var express = require("express"),
  stylus = require("stylus"),
  nib = require("nib"),
  app = express();
 
app.configure(function(){
  this.locals.pretty = true;
  this.set("views", __dirname + "/views");
  this.set("view engine", "jade");
  this.use(express.bodyParser());
  this.use('/css', stylus.middleware({
    src: __dirname + "/stylesheets",
    dest: __dirname + "/public/css",
    compile:  function compile(str, filePath) {
     return stylus(str)
       .set('filename', filePath)
        .set('paths', [ __dirname + "/stylesheets" ])
       .set('compress', true)
       .use(nib())
       .import('nib');
   }
  }));

  this.use(express.compress());
  this.use(express.static(__dirname + "/public"));
  this.use(app.router);
});

app.get("/", function(req, res){
  res.render("index", {
    photos: [
      {file: "/photos/IMG_0951.jpg", description: "Noders!"},
      {file: "/photos/IMG_0953.jpg", description: "Matías explicando módulos en node.js con legos"},
      {file: "/photos/IMG_0952.jpg", description: "hora de ejercicios!"},
      {file: "/photos/IMG_0963.jpg", description: "Damian explicando express.js"},
      {file: "/photos/IMG_0960.jpg", description: "José explicando un ejercicio"},
      {file: "/photos/IMG_0962.jpg", description: "con hambre no se puede pensar"},
      {file: "/photos/IMG_0955.jpg", description: "Matías explicando funcionamiento de require"},
      {file: "/photos/IMG_0969.jpg", description: "Damian explicando funcionamiento de socket.io"},
      {file: "/photos/IMG_0971.jpg", description: "y más ejercicios"}
    ]
  });
});




app.get("/succeed", function(req, res){
  res.render("succeed");
});

app.post("/", function(req, res){
  mailer(req.body.email, req.body.category, function(err){
    if(err){
      res.send(500, err);
    }else{
      res.redirect(generateDineroMailUrl(req.body));
    }
  });
});

app.listen(8001, function(){
  console.log("listening on http://localhost:8001");
});