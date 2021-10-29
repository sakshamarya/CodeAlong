// client side - editor
// const http = require('http');
// const server = http.createServer(app);
// const {Server} = require("socket.io");
// const io = new Server(server);


// var socket = io();

var editor=CodeMirror.fromTextArea(document.getElementById('editor'),{
    mode: "clike",
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,

});

var defaultCode = `#include<iostream>
using namespace std;
int main()
{
  return 0;
}`

let resetBtn = document.querySelector('.navReset');

editor.setValue(defaultCode);

let box = document.querySelector('.codeText');
let width = box.offsetWidth;
let height = box.offsetHeight;

editor.setSize(width-5, height-7);

resetBtn.addEventListener('click',()=>{
    editor.setValue(defaultCode);
});