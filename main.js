const N = 4;
let Numbers = [];
let M = [];
let memoryImages = [];
let memory = [-1,-1,-1];
let time = 59;
let countDownStart;
onload = ()=>{
    createNumbers();
    createArr();
    createTable();
    setTimeout(hideImages,1500);
    countDownStart = setInterval(countDown,1000);
};


const createNumbers = ()=>{
    let k = 1;
    for(let i = 0; i < N*N; i++ ){
        k = k <= N * 2 ? k : 1;
        Numbers[i] = k++;
    }
};

const createArr = ()=>{
    let k = 0;
    for(let i = 0; i < N; i++){
       M[i] = [];
       memoryImages[i] = [];
        for(let j = 0; j < N; j++){
            k = Math.floor(Math.random() * Numbers.length);
            M[i][j] = Numbers[k];
            memoryImages[i][j] = Numbers[k];
            Numbers.splice(k,1);
        }
    }
};

const createTable = () =>{
    let table = '';
    for(let i = 0; i < N; i++){
        table += `<tr>`;
        for(let j = 0; j < N; j++){
            table += `<td onclick="showImage(${i},${j})"><img src="./img/${M[i][j]}.png" /></td>`;
        }
        table += `</tr>`;
    }
    document.getElementsByTagName("table")[0].innerHTML = table;
};

const hideImages = ()=>{
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            M[i][j] = 0;
        }
    }  
    createTable();
};

const showImage = (i,j) =>{
   if(M[i][j]===0){
    M[i][j] = memoryImages[i][j];
    createTable();

    if(memory[2] === -1){
        memory[0] = i;
        memory[1] = j;
        memory[2] = 1;
    }else{
        if(M[i][j] !== M[memory[0]][memory[1]]){
            M[i][j] = 0;
            M[memory[0]][memory[1]] = 0;
            setTimeout(createTable,350);
        }

        memory[0] = -1;
        memory[1] = -1;
        memory[2] = -1;
    }
    setTimeout(checkWin,350);
   }
}

const checkWin = ()=>{
    count = 0;
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(M[i][j] !== 0){
                count++;
            }
        }
    }
    if(count == N * N){
        alert("Win!");
        location.reload();
        clearInterval(countDownStart);
        return 0;
    }
}

const countDown = ()=>{
    if(time === 0){
        clearInterval(countDownStart);
        alert("Game over!!!");
        location.reload();
        return 0;
    }
    document.getElementsByTagName("div")[0].innerHTML = `00:${time < 10 ? `0${time}` : time}`;
    time--;
};