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



// console.log(canvas.width+ " " + canvas.offsetWidth + " => " );
// console.log(canvas.height+ " " + canvas.offsetHeight + " => " );
let ctx = canvas.getContext("2d");

let x;
let y;

var dx=(0.03*window.innerWidth)+55;
var dy=(0.07*window.innerHeight)+20;

// var dx=0;
// var dy=0;

let mouseClick = false;


window.onmousedown = (e)=>{

    // dy=parseInt(canvas.height)-parseInt(canvas.offsetHeight);
    // dx=parseInt(canvas.width)-parseInt(canvas.offsetWidth);


    // when mouse position changes, we have to change the mouse position for every client
    socket.emit('changeMousePositionDown',x,y,mouseClick);

    x=e.clientX;
    y=e.clientY;
    
    ctx.moveTo(x-dx,y-dy);
    mouseClick=true;

    socket.on('changeMousePositionDown',(x,y,mouseClick)=>{
        ctx.moveTo(x-dx,y-dy);
        mouseClick=true;
    });

};



window.onmouseup = (e)=>{

    // change mouseClick variable for all the clients on the server 
    socket.emit('mouseClickUp',mouseClick);


    x=e.clientX;
    y=e.clientY;
    
    ctx.moveTo(x-dy,y-dy);

    mouseClick=false;

    socket.on('mouseClickUp',(mouseClick)=>{
        mouseClick=false;
    });
};




// white colour stroke and width

ctx.strokeStyle = '#ffffff'; //default stroke colour
ctx.lineWidth = 2;

var pen = document.getElementById('pen');
var eraser=document.getElementById('eraser');

pen.addEventListener('click',()=>{
    ctx.strokeStyle = '#ffffff'; 
});

eraser.addEventListener('click',()=>{
    ctx.strokeStyle = '#000000';
});







window.onmousemove = (e)=>{

    
    // get coordinates of the mouse
    x=e.clientX;
    y=e.clientY;

    // check whether mouse is clicked or not
    if(mouseClick == true)
    {

        // dy=parseInt(canvas.height)-parseInt(canvas.offsetHeight);
        // dx=parseInt(canvas.width)-parseInt(canvas.offsetWidth);


        // when mouse click is true, we have to draw on the server
        socket.emit('draw',x,y);

        // make line
        ctx.lineTo(x-dx,y-dy);
        ctx.stroke();
    }

    socket.on('draw',(x,y)=>{
        ctx.lineTo(x-dx,y-dy);
        ctx.stroke();
    });

};

