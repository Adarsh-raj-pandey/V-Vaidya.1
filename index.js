const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose.js');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const MongoStore = require('connect-mongo');



// setup the chat server to be used with socket.io   
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets.js').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');     

app.use(express.urlencoded());
app.use(cookieParser());       



app.use(express.static('./assets'));    


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine 
app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));

//app.set('views','./views');   

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Vvaidya',
    // todo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*130)
    }, store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/vvaidya_db',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

 app.use(passport.initialize());
 app.use(passport.session());          
 
 app.use(passport.setAuthenticatedUser);
 // user express router 
 app.use('/',require('./routes/index.js'));   


app.listen(port,function(err){
    if(err){ console.log(`Error in a network: ${err}`)};

    console.log(`yup! my express server is running ${port}`);  
});
