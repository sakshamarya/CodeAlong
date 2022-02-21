const express = require('express');
const app=express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

// for compiler codex API
const axios = require('axios');

app.use(cors());

app.use(
    cors({
        origin : "*",
        allowedHeaders : "*"
    })
)

// Compiler API fetching from client
app.use(express.json());

app.post('/compileAPI',(req,res)=>{
    
    var data = JSON.stringify({
        "code": req.body.text,
        "language":req.body.userLanguage,
        "input": req.body.userInput,
        });
    
    var config = {
    method: 'post',
    url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode/',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    
    axios(config)
    .then(function (response) {

        console.log(response.data.output);
        res.json(response.data);
    })
    .catch(function (error) { 
        console.log(error);
    });

});


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.get('/editor.js',(req,res)=>{
    res.sendFile(__dirname+'/editor.js');
});
app.get('/style.css',(req,res)=>{
    res.sendFile(__dirname+'/style.css');
});
app.get('/browserify_compiler.js',(req,res)=>{
    res.sendFile(__dirname+'/browserify_compiler.js');
});

app.get('/canvas.js',(req,res)=>{
    res.sendFile(__dirname+'/canvas.js');
});


app.get('/codemirror/lib/codemirror.css',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/lib/codemirror.css');
});
app.get('/codemirror/lib/codemirror.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/lib/codemirror.js');
});
app.get('/codemirror/mode/clike/clike.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/mode/clike/clike.js');
});
app.get('/codemirror/mode/python/python.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/mode/python/python.js');
});
app.get('/codemirror/mode/ruby/ruby.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/mode/ruby/ruby.js');
});
app.get('/codemirror/mode/swift/swift.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/mode/swift/swift.js');
});
app.get('/codemirror/theme/dracula.css',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/theme/dracula.css');
});
app.get('/codemirror/addon/edit/closebrackets.js',(req,res)=>{
    res.sendFile(__dirname+'/codemirror/addon/edit/closebrackets.js');
});


// socket server

io.on('connection',(socket)=>{
    console.log('a user is connected');

    // editor IDE

    socket.on('newText',(text)=>{
        socket.broadcast.emit('newText',text);
    });

    socket.on('newCustInp',(customInputText)=>{
        socket.broadcast.emit('newCustInp',customInputText);
    });

    socket.on('newOutput',(outputText)=>{
        socket.broadcast.emit('newOutput',outputText);
    });

    socket.on('resetBtnPressed',()=>{
        socket.broadcast.emit('resetBtnPressed');
    })

    socket.on('changeNavLang',(userLanguage)=>{
        socket.broadcast.emit('changeNavLang',userLanguage);
    });

    socket.on('runButtonChanges',(runBtn,outputDiv)=>{
        socket.broadcast.emit('runButtonChanges',runBtn,outputDiv);
    });

    // Canvas Board

    // for changing the mouse position on click
    socket.on('changeMousePositionDown',(mouseClick)=>{
        socket.broadcast.emit('changeMousePositionDown',mouseClick);
    });

    // changing variable value when mouse click is released

    socket.on('mouseClickUp',(mouseClick)=>{
        socket.broadcast.emit('mouseClickUp',mouseClick);
    });

    // for drawing on board
    socket.on('draw',(x,y,mouseClick,nx,ny,ispen)=>{
        socket.broadcast.emit('draw',x,y,mouseClick,nx,ny,ispen);
    });

});

let PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log('server is listening on port 5000');
});