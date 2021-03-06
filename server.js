var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var cinfig = {
    user: 'meherzanturel1997',
    database: 'meherzanturel1997',
    host: 'db.imad.hasura-app.io',
    password:process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

var articles={
    var articleone:{
        title:'Article One | meherzanturel1997',
        heading:'Article One',
        date:'August 3, 2017',
        content:` <p>
                        This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one. This is contemt of the article one. 

                    </p>
                    <p>
                        This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.
                    </p>
                    <p>
                        This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.This is content of te artcle one.
                    </p>`
    };
    
    var aricletwo:{
        title:'Article Two | Meherzan Turel',
        heading:'Article Two',
        date:'August 4, 2017',
        content:` <p>
                        This is content of my article two.
                    </p>`
    };
                    
    var articlethree:{
        title:'Article Three | Meherzan Turel',
        heading:'Article Three',
        date:'August 6, 2017',
        content:` <p>
                        This is content of my article three.
                    </p>`,
    };
};
function createtemplate (data){
    var title= data.title;
    var date= data.date;
    var heading=data.heading;
    var content= data.content;
var htmltemplate=`
       <html>
    <head>
        <title>
           ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr />
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
               ${content}
            </div>
        </div>
    </body>
</html>
`;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,req){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function (err, reult){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    })
});

app.get('/:articlename',function(req,res){
    //articlename == article-one
    //articles[articlename] == {} content object for article one
    var articlename=req.params.articlename;
    res.send(createtemplate(articles[articlename]));
});

app.get('/article-two',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
 res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
