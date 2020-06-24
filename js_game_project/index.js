

const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');

//게임 시작하는 것 구현
startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);

//이 화면에서 키가 눌리면 이벤트 리스너가 감지할 수 있는것 keydown
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

// 키 정보를 저장할 수 있는 변수 선언
let keys = {};

//새의 정보를 담을 변수를 생성
let player = {
    x:0, //player객체의 x좌표 ,y좌표
    y:0,
    speed:2,
    score:0,
    inplay: false
};

let pipe = {
    startPos : 0,
    //기둥과 기둥의 사이의 간격 값
    spaceBetWeenRow : 0,
    //윗 기둥과 아랫기둥 사이의 간격
    spaceBetWeenCol : 0,
    // 파이프의 갯수
    pipeCount : 0,
}

function start(){
    console.log("game start");
    player.inplay = true;
    player.score = 0;
    gameArea.innerHTML = "";
    //start버튼을 클릭하면 gameMessge클래스에 hide(css에서 display:none해둔 것)클래스를 추가한다.
    gameMessage.classList.add('hide');
    startBtn.classList.add('hide');
    //플레이어 생성
    let bird = document.createElement("div");
    let wing = document.createElement("div");
    //div요소에 attribute생성
    bird.setAttribute("class","bird");
    wing.setAttribute("class","wing");
    //bird요소의 자식으로 wing을 배치
    bird.appendChild(wing);
    wing.pos = 15;
    wing.style.top = wing.pos + 'px';
    //gameArea의 자식으로 bird를 배치
    gameArea.appendChild(bird);
    player.x = bird.offsetLeft;
    player.y = bird.offsetTop;

    pipe.startPos = 0;
    pipe.spaceBetWeenRow = 400;
    pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetWeenRow);

    for(let i = 0; i <pipe.pipeCount; i++){
        makePipe(pipe.startPos * pipe.spaceBetWeenRow);
        pipe.startPos++;
    }

    //어떤한 함수를 통해서 브라우저 안에 있는 어떤 요소의 위치를 움직는데 
    //그 움직이는 표현하는 함수를 매개변수로 집어넣는다. ex) playgame
    //애니메이션을 부드럽게 해주는 함수 requestAnimationFrame
    window.requestAnimationFrame(playGame);
}

function makePipe(pipePos){
    let totalHeight = gameArea.offsetHeight;
    let totalwidth = gameArea.offsetWidth;
    let pipeUp = document.createElement("div");
    pipeUp.classList.add("pipe");
    pipeUp.height = Math.floor(Math.random() * 350);
    pipeUp.style.height = pipeUp.height + "px";
    pipeUp.style.left = totalwidth + pipePos + "px";
    pipeUp.x = totalwidth + pipePos;
    pipeUp.style.top = "0px";
    pipeUp.style.backgroundColor = "red";

    gameArea.appendChild(pipeUp);

    pipe.spaceBetWeenCol = Math.floor(Math.random() * 250) + 150;

    let pipeDown = document.createElement("div");
    pipeDown.classList.add("pipe");
    pipeDown.style.height = totalHeight - pipeUp.height - pipe.spaceBetWeenCol + "px";
    pipeDown.style.left = totalwidth + pipePos + "px";
    pipeDown.x = totalwidth + pipePos;
    pipeDown.style.bottom = "0px";
    pipeDown.style.backgroundColor = "black";

    gameArea.appendChild(pipeDown);

}

function movePipes(bird){
    let pipes = document.querySelectorAll(".pipe");
    //삭제된 파이프의 갯수 저장
    let counter = 0;
    pipes.forEach(function(item){
        item.x -= player.speed;
        item.style.left = item.x + "px";
        if(item.x < 0){
            item.parentElement.removeChild(item);
            counter++;
        }

        if(isCollide(item, bird)){
            console.log("충돌!!");
        }
    });

   

    for(let i = 0; i < counter/2; i++){
        makePipe(0);
    }
}

function isCollide(pipe, bird){
    let pipeRect = pipe.getBoundingClientRect();
    let birdRect = pipe.getBoundingClientRect();
    return(
        asd
    );
    
}

function playGame(){
    if(player.inplay){
        let bird = document.querySelector('.bird');
        let wing = document.querySelector('.wing');
        movePipes(bird);
         let move = false;
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
            move = true;
        }
        if(keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth){
            player.x += player.speed;
            move = true;
        }
        if((keys.ArrowUp || keys.Space) && player.y > 0){
            player.y -= player.speed * 5;
            move = true;
        }
        if(keys.ArrowDown && player.y < gameArea.offsetHeight - bird.offsetHeight){
            player.y += player.speed;
            move = true;
        }
        if(move){
            //move값이 트루면 wing.pos 가 15면 25로 만들고 15가 아니면 15를 넣어라.
            wing.pos = wing.pos === 15 ? 25 : 15;
            wing.style.top = wing.pos + "px";
        }  
            //중력만들기
        player.y += player.speed * 2;
        if(player.y > gameArea.offsetHeight){
            playGameOver();
        }

        bird.style.left = player.x +'px';
        bird.style.top = player.y +'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "SCORE : " + player.score;
    }

    
  
}


function playGameOver(){
    player.inplay = false;
    gameMessage.classList.remove("hide");
    gameMessage.innerHTML =
    "GAME OVER<br/>당신의 점수는 "+ player.score +"점 입니다. <br/> 다시 시작하려면 여기를 누르세요!";
}

function pressOn(e){
    console.log(e.code);
    keys[e.code] = true;
    console.log(keys);
};

function pressOff(e){
    console.log(e.code);
    keys[e.code] = false;
    console.log(keys);
};