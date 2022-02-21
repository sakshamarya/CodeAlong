
var btn = document.querySelector('.navWhiteBoard');
let canvas = document.getElementById('canvas');




canvas.width=0.978*window.innerWidth;
canvas.height=0.84*window.innerHeight;



let ctx = canvas.getContext("2d");
let mouseClick = false;

var x;
var y;


canvas.addEventListener('mousedown',(e)=>{

    x=(e.clientX-canvas.offsetLeft);
    y=(e.clientY-canvas.offsetTop);

    // when mouse position changes, we have to change the mouse position for every client
    socket.emit('changeMousePositionDown',mouseClick);

    
    mouseClick=true;

    socket.on('changeMousePositionDown',(mouseClick)=>{
        mouseClick=true;
    });

});



canvas.addEventListener('mouseup',(e)=>{

    // change mouseClick variable for all the clients on the server 
    socket.emit('mouseClickUp',mouseClick);


    mouseClick=false;

    socket.on('mouseClickUp',(mouseClick)=>{
        mouseClick=false;
    });
});




// white colour stroke and width

ctx.strokeStyle = '#000000'; //default stroke colour
ctx.lineWidth = 2;

var pen = document.getElementById('pen');
var eraser=document.getElementById('eraser');

var ispen=true;

pen.addEventListener('click',()=>{
    ispen=true;
});

eraser.addEventListener('click',()=>{
    ispen=false;
});

var nx;
var ny;


canvas.addEventListener('mousemove',(e)=>{


    // check whether mouse is clicked or not
    if(mouseClick == true)
    {

        console.log(x+', '+y);

        ctx.moveTo(x,y);

        // get coordinates of the mouse
        nx=(e.clientX-canvas.offsetLeft);
        ny=(e.clientY-canvas.offsetTop);

        

        // when mouse click is true, we have to draw on the server
        socket.emit('draw',x,y,mouseClick,nx,ny,ispen);

        // make line
        if(ispen)
        {
            ctx.lineTo(nx,ny);
            ctx.stroke();
            x=nx;
            y=ny;
            
        }
        else{
            ctx.clearRect(nx,ny,(nx+1),(ny+1));
        }

    }


});


socket.on('draw',(x,y,mouseClick,nx,ny,ispen)=>{

    console.log(x+', '+y);

    ctx.moveTo(x,y);

    // make line
    if(ispen)
    {
        ctx.lineTo(nx,ny);
        ctx.stroke();
        x=nx;
        y=ny;
        
    }
    else{
        ctx.clearRect(nx,ny,(nx+1),(ny+1));
    }
});