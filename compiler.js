const axios = require('axios');
let text="";
let input="";
let runBtn=document.querySelector('.navRun');



runBtn.addEventListener('click',()=>{

    // get the user's code from the editor
    text = editor.getValue();
    input = document.getElementById('custInp').value;

    // console.log(text);
    // console.log(input);

    var data = JSON.stringify({
        "code": text,
        "language":"cpp",
        "input":input
        });
    
    var config = {
      method: 'post',
      url: 'https://cors-anywhere.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {

        document.getElementsByClassName('output')[0].innerHTML = response.data.output;

      console.log(response.data);
    })
    .catch(function (error) {
      document.getElementsByClassName('output')[0].innerHTML = "Something is wrong";
      console.log(error);
    });

});





