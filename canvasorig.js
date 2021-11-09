var modal = document.getElementById('modal');
var btn = document.querySelector('.navWhiteBoard');
var closeBtn = document.querySelector('.close-button');
var modalBody = document.querySelector('.modal-body');
let canvas = document.getElementById('canvas');


btn.addEventListener('click',()=>{
    modal.style.display="block";
    
});


window.onclick = function(event){
    if(event.target == modal){
        modal.style.display="none";
    }
};


canvas.width=0.87*window.innerWidth;
canvas.height=0.8*window.innerHeight;



let ctx = canvas.getContext("2d");

let mouseClick = false;

var x;
var y;


canvas.addEventListener('mousedown',(e)=>{

    x=(e.clientX-canvas.offsetLeft);
    y=(e.clientY-canvas.offsetTop);

    console.log(x+"||"+y);
    ctx.moveTo(x,y);

    // when mouse position changes, we have to change the mouse position for every client
    socket.emit('changeMousePositionDown',x,y,mouseClick);

    
    mouseClick=true;

    socket.on('changeMousePositionDown',(x,y,mouseClick)=>{
        console.log(x+"||"+y);
        ctx.moveTo(x,y);
        mouseClick=true;
    });

});



canvas.addEventListener('mouseup',(e)=>{

    // change mouseClick variable for all the clients on the server 
    socket.emit('mouseClickUp',mouseClick,x,y);


    x=(e.clientX-canvas.offsetLeft);
    y=(e.clientY-canvas.offsetTop);
    
    ctx.moveTo(x,y);

    mouseClick=false;

    socket.on('mouseClickUp',(mouseClick,x,y)=>{
        // ctx.moveTo(x,y);
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







canvas.addEventListener('mousemove',(e)=>{


    // check whether mouse is clicked or not
    if(mouseClick == true)
    {

        // get coordinates of the mouse
        x=(e.clientX-canvas.offsetLeft);
        y=(e.clientY-canvas.offsetTop);

        

        // when mouse click is true, we have to draw on the server
        socket.emit('draw',x,y);

        // make line
        if(ispen)
        {
            ctx.lineTo(x,y);
            ctx.moveTo(x,y);
            ctx.stroke();
        }
        else{
            ctx.clearRect(x,y,(parseInt(x)+0.1),(parseInt(y)+0.1));
        }

    }

    socket.on('draw',(x,y,mouseClick)=>{
        if(ispen)
        {
            ctx.lineTo(x,y);
            ctx.moveTo(x,y);
            ctx.stroke();
        }
        else{
            ctx.clearRect(x,y,x+0.1,y+0.1);
        }
    });

});

