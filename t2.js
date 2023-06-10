const canvas = document.getElementById("battle");
const ctx = canvas.getContext("2d");
ctx.font="30px serif";
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let score=0;
const shooter=new Audio("shoot.mp3");
const hitter=new Audio("hit.mp3");
let starter=document.getElementById(`start`);


de=2;
let end=document.getElementById(`end`);
end.style.display="none";
let scorebox=document.querySelector(`.score`);

let x=600;
let y=550;
let dp=40;
let z=440
let dz=40;
let c=0;
let dc=1; 
let pimp=8;
let l=220;
dl=0;
bullets=[{
    d:x+20,f:450,dx:30,
     dy:30,
}]
enemy=[{
    g:625,h:20,
}]

function particle(){
   
        if(enemy.length<pimp){
            let a=500;
            let b=900;
            let c=10;
            let d=20;
            enemy.push({g:Math.round(a+(b-a)*Math.random()),h:Math.round(c+(c-d)*Math.random())})
        }
        for(let j=0;j<pimp;j++){
            ctx.beginPath();
            ctx.fillStyle="yellow";
            ctx.arc(enemy[j].g,enemy[j].h,15,0,2*Math.PI,true);
            ctx.fill();
            enemy[j].h+=dc;
    }
        
        
    
}
  

function draw(){
    ctx.fillStyle="red";
    ctx.fillRect(700,350,80,80);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(x,y,30,0,2*Math.PI,true);
    ctx.fill();
    x+=dp;
    dp=0;

    
}
function body(){
    ctx.fillStyle="purple";
    ctx.fillRect(x-10,450,20,80);
    

}





function update(){
    
    enemy.push({g:Math.random()*canvas.width,h:0})
}
    addEventListener('click',(event)=>{
        shooter.play();
        const angle=Math.atan2(
            event.clientY-450,event.clientX-x,

        );
        bullets.push({d:x,f:450,dx:Math.cos(angle)*15,dy:Math.sin(angle)*15})
      

    });
 


function move(){
    for(let i=0;i<bullets.length;i++){
        bullets[i].d+=bullets[i].dx;
        bullets[i].f+=bullets[i].dy;
    }
}
function text(){
    ctx.font="30px serif";
    ctx.strokeStyle="white"
    ctx.strokeText("HOME",720,400,40);
    ctx.fillStyle="white"
ctx.font="30px serif";
ctx.fillText("PLAYER",540,570,50);
ctx.fillStyle="white"
ctx.font="30px serif";
ctx.fillText("SCORE : "+score,1120,80,80);
    
}



function distance(a,b,c,d){
    var result=Math.hypot(a-b,c-d);
    return result;

}
function dist(a,b){
    var diff=Math.abs(a-b);
    return diff;
}
function sum(a,b){
    var si=a-b;
    return si;
}


function animate(){

requestAnimationFrame(animate);
   

    ctx.clearRect(0,0,innerWidth,innerHeight);
    particle();
    
draw();
text();


body();
move();
   


update();





for (let i=0;i<bullets.length;i++){
    ctx.beginPath();
        ctx.fillStyle="green";
        ctx.arc(bullets[i].d,bullets[i].f,8,0,2*Math.PI,true);

    ctx.fill();
       
}

for (let i=0;i<bullets.length;i++){
    for(let j=0;j<pimp;j++){

if((distance(bullets[i].f,enemy[j].h,bullets[i].d,enemy[j].g)<25)){
 
    score+=2;
  hitter.play();
   
    
  enemy.splice(j,1);
    bullets.splice(i,1);
}
    }
    }



    for (let i=0;i<pimp;i++){
      if(dist(enemy[i].h,350)<=15&&sum(700,enemy[i].g)<=15&&sum(700,enemy[i].g )>=-95){
           
  enemy.splice(i,1);
        dl=15;
      }
    }
    for(let j=0;j<pimp;j++){
        if(enemy[j].h+15==600){
            enemy.splice(j,1);
            dl=15;
        }
    }
    ctx.fillStyle="red";
    ctx.fillRect(0,600,canvas.width,620);   


    ctx.fillStyle="white";
ctx.fillRect(8,80,225,18);
    ctx.fillStyle="red"
ctx.fillRect(10,82,l,13);
l-=dl;
dl=0;


if(l<=0){
    end.style.display="block";
    scorebox.textContent=score;
    end.addEventListener(`click`,(e)=>{
    
        end.style.cursor="pointer"
       l=220;
      end.style.display="none"
     score=0;
     for(let i=0;i<enemy.length;i++){
        enemy[i].h=10;
     }
     let x=600;
let y=550;
      })
    
   
}



}
window.addEventListener('keydown',e=>{
   
    switch(e.key){
        case"ArrowRight":
         dp=40;
        
       break;  
  

     
        case"ArrowLeft":
      dp=-40
       
       
       break;
    default:
        break;
     }
})
starter.addEventListener(`click`,(e)=>{
   
    starter.style.display="none";
    starter.style.cursor="pointer";
    requestAnimationFrame(animate);
 particle();
 
})



