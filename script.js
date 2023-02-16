let obj = [];
let optArr = new Array(10);   //there was no need of this.
let correctOpt = new Array(10);
let selectedOpt = new Array(10);
let checking = false;

let i=0;
let topic = "film_and_tv";
let dif_lev = "easy";
const dif_selector = document.querySelector('#difficulty');
const cat_selector = document.querySelector('#category');

function changeSelections(){
    dif_lev = dif_selector.value;
    topic = cat_selector.value;
    console.log("dif value :" + dif_lev);
    console.log("cat value :" + topic);
    fetchData();
}
   
fetchData();

    function fetchData(){
        // console.log("data fetched");
        // console.log("dif value :" + dif_lev);
    // console.log("cat value :" + topic);

   
        if(topic == "any" && dif_lev == "any"){
            fetch('https://the-trivia-api.com/api/questions?limit=10')
            .then(response => response.json())
        .then(json => obj = {...json});
        }

        else if(topic == "any"){
            fetch(`https://the-trivia-api.com/api/questions?limit=10&difficulty=${dif_lev}`)
        .then(response => response.json())
        .then(json => obj = {...json});
        }

        else if(dif_lev == "any"){
            fetch(`https://the-trivia-api.com/api/questions?categories=${topic}&limit=10`)
        .then(response => response.json())
        .then(json => obj = {...json});
        }

        else {
        fetch(`https://the-trivia-api.com/api/questions?categories=${topic}&limit=10&difficulty=${dif_lev}`)
        .then(response => response.json())
        .then(json => obj = {...json});
        }
        // console.log(obj);
    }

// console.log(correctOpt);

const quesDiv = document.querySelector('.question');
const optContainer = document.querySelectorAll('.options');    
const opts = document.querySelectorAll('.option');    
const opt1 = document.querySelector('.option1');
const opt2 = document.querySelector('.option2');
const opt3 = document.querySelector('.option3');
const opt4 = document.querySelector('.option4');
const nxtBtn = document.querySelector('.nxtBtn');
const prvBtn = document.querySelector('.prvBtn');
const newGameBtn = document.querySelector('.newGameBtn');
const checkBtn = document.querySelector('.checkBtn');
const stBtn = document.querySelector('.startBtn');
const quesContainer = document.querySelector('.ques-container');
const marksBox = document.querySelector('.marks');
const outOf = document.querySelector('.outOf');
const score = document.querySelector('.score');
const selectContainer = document.querySelector('.select');
const scoreBoard = document.querySelector('.scoreBoard');
const notAnswered = document.querySelector('#num1');
const correct = document.querySelector('#num2');
const incorrect = document.querySelector('#num3');

    function clearOtherOption(){
        // let optChildren = optContainer.childNodes;
        // console.log("optChildren :");
        // console.log(optChildren);
        opts.forEach(opt=>{opt.style.color = "black";
            opt.style.backgroundColor = "white";});

         if(checking){
             if(selectedOpt[i]==0){
                if(correctOpt[i]==1){
                    opt1.style.backgroundColor = "#f1f128c2";
                }
                else if(correctOpt[i]==2){
                    opt2.style.backgroundColor = "#f1f128c2";
                }
                else if(correctOpt[i]==3){
                    opt3.style.backgroundColor = "#f1f128c2";
                }
                else if(correctOpt[i]==4){
                    opt4.style.backgroundColor = "#f1f128c2";
                }
             }
             else {
                if(correctOpt[i]==1){
                    opt1.style.backgroundColor = "#6ce96c";
                }
                else if(correctOpt[i]==2){
                    opt2.style.backgroundColor = "#6ce96c";
                }
                else if(correctOpt[i]==3){
                    opt3.style.backgroundColor = "#6ce96c";
                }
                else if(correctOpt[i]==4){
                    opt4.style.backgroundColor = "#6ce96c";
                }
            }
            
            if(selectedOpt[i]!=correctOpt[i]){
                if(selectedOpt[i]==1){
                    opt1.style.backgroundColor = "#e90d0da8";
                }
                else if(selectedOpt[i]==2){
                    opt2.style.backgroundColor = "#e90d0da8";
                }
                else if(selectedOpt[i]==3){
                    opt3.style.backgroundColor = "#e90d0da8";
                }
                else if(selectedOpt[i]==4){
                    opt4.style.backgroundColor = "#e90d0da8";
                }
            }
            
         }   
    }
    
    function update(){
        console.log("update func called");
        if(i==1) prvBtn.classList.remove("hide");
        if(i==0) prvBtn.classList.add("hide");

        if(i==9) nxtBtn.innerHTML = 'END';
        if(i==8) nxtBtn.innerHTML = 'NEXT';
        if(i==0) nxtBtn.innerHTML = 'NEXT';
        
        selectContainer.classList.add("hide");
        if(i==10){
            let m=0;
            let ans=0;
            for(let y=0; y<10; y++){
                if(selectedOpt[y]!=0){
                if(selectedOpt[y]==correctOpt[y])
                    m++;
                    ans++;    
                }
                }
            quesContainer.classList.add("hide");
            scoreBoard.classList.remove("hide");
            marksBox.innerHTML = m;
            notAnswered.innerHTML = 10-ans;
            correct.innerHTML = m;
            incorrect.innerHTML = ans-m;
        }
    
        if(optArr[i]==null){
        let k = 0;
        let dispOpt = [];
        dispOpt[correctOpt[i]-1] = obj[i].correctAnswer;
        
        
        for(let num=0; num<4; num++){
            if(num!=(correctOpt[i]-1)){
            dispOpt[num] = obj[i].incorrectAnswers[k++];
            }
        }
        
        optArr[i] = dispOpt;
        console.log("optArr");
        console.log(optArr);
    }

        quesDiv.innerHTML = (i+1) + ". " + obj[i].question;
        clearOtherOption();

        opt1.innerHTML = optArr[i][0]
        opt2.innerHTML = optArr[i][1]
        opt3.innerHTML = optArr[i][2];
        opt4.innerHTML = optArr[i][3];
        i++;
    }

    function startBtnClicked(){
        console.log("stBtn called");
        console.log(obj);
        stBtn.classList.add("hide");
        quesContainer.classList.remove("hide");
        // fetchData();
        update();   
    }

    function updatePrv(){
        i--;
        i--;
        update();
    }
    
    function setSelectedOpt1(){
        console.log("setSelectedOpt called");
        selectedOpt[i-1] = 1;
        clearOtherOption();
        opt1.style.color = "white";
        opt1.style.backgroundColor = "black";
    }

    function setSelectedOpt2(){
        selectedOpt[i-1] = 2;
        clearOtherOption();
        opt2.style.color = "white";
        opt2.style.backgroundColor = "black";
    }

    function setSelectedOpt3(){
        selectedOpt[i-1] = 3;
        clearOtherOption();
        opt3.style.color = "white";
        opt3.style.backgroundColor = "black";
    }

    function setSelectedOpt4(){
        selectedOpt[i-1] = 4;
        console.log(selectedOpt);
        clearOtherOption();
        opt4.style.color = "white";
        opt4.style.backgroundColor = "black";
    }

    function newGame(){
        opt1.addEventListener('click',setSelectedOpt1);
        opt2.addEventListener('click',setSelectedOpt2);
        opt3.addEventListener('click',setSelectedOpt3);
        opt4.addEventListener('click',setSelectedOpt4);
        opts.forEach(opt=>{opt.style.cursor = "pointer";});
        console.log("newgame() called");
        checking = false;
        for(let j=0; j<10; j++){
            correctOpt[j]=Math.floor((Math.random() * 4) + 1);
            selectedOpt[j]=0;
        }
        
        if(!(scoreBoard.classList.contains("hide"))){
            scoreBoard.classList.add("hide");
            stBtn.classList.remove("hide");
            selectContainer.classList.remove("hide");
            i=0;
            fetchData();
        }
    }

    function check(){
        checking = true;
        i=0;
        opt1.removeEventListener('click',setSelectedOpt1);
        opt2.removeEventListener('click',setSelectedOpt2);
        opt3.removeEventListener('click',setSelectedOpt3);
        opt4.removeEventListener('click',setSelectedOpt4);
        // opt4.removeEventListener();
        quesContainer.classList.remove("hide");
        scoreBoard.classList.add("hide");

        opts.forEach(opt=>{opt.style.cursor = "default";});

        update();
    }
    
    newGame();


nxtBtn.addEventListener('click',update);
prvBtn.addEventListener('click',updatePrv);
newGameBtn.addEventListener('click',newGame);
checkBtn.addEventListener('click',check);
stBtn.addEventListener('click',startBtnClicked);
opt1.addEventListener('click',setSelectedOpt1);
opt2.addEventListener('click',setSelectedOpt2);
opt3.addEventListener('click',setSelectedOpt3);
opt4.addEventListener('click',setSelectedOpt4);
dif_selector.addEventListener('change',changeSelections);
cat_selector.addEventListener('change',changeSelections);