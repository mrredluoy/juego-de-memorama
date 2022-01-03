const contenedor= document.getElementById('contenedor')
const fragmen= document.createDocumentFragment();
const acierto=document.getElementById('acierto')
const error=document.getElementById('error')
const victory=document.getElementById('victory')
const star=document.getElementById('inicio')
const over=document.getElementById('gameOVER')
let limite=document.getElementById('time')
let nombres=[]
let eleArray=[]
let activation=false
let aciertos=0
let inicio=true
let tiempo=25

let  arrayimg=[
   { 
     id:1,
     nombre:'facebook',
     img:'img/facebook.svg'
   },
   {
     id:2,
    nombre:'youtube',
    img:'img/youtube.svg'
  },
  {
    id:3,
    nombre:'insta',
    img:'img/insta.svg'
  },
  {
    id:4,
    nombre:'whatsapp',
    img:'img/whatsapp.svg'
  },
  { 
    id:5,
    nombre:'facebook',
    img:'img/facebook.svg'
  },
  {
    id:6,
   nombre:'youtube',
   img:'img/youtube.svg'
 },
 {
   id:7,
   nombre:'insta',
   img:'img/insta.svg'
 },
 {
   id:8,
   nombre:'whatsapp',
   img:'img/whatsapp.svg'
 }


]
arrayimg = arrayimg.sort(function() {return Math.random() - 0.5});

+function dibujar(){

for(i=0;i<(arrayimg.length);i++){     
    let div=document.createElement('div')
    div.classList.add('card')
    let imgs=document.createElement('img')
    imgs.setAttribute('src','img/sceptic.svg')
    imgs.classList.add('img')   
    imgs.setAttribute('id',arrayimg[i].id)
    div.appendChild(imgs)
    fragmen.appendChild(div)  
}
contenedor.appendChild(fragmen)
}()


star.addEventListener('click',e=>{
 if(inicio==true){
   inicio=false
  activation=true
  star.style.opacity=0.3
  time()
 }
})
contenedor.addEventListener('click',iniciar)

function iniciar(e){
if(e.target.classList.contains('img')&&activation==true){
  let card=e.target
  eleArray.push(card)
  paso1(card)
}
}

function paso1(ele){
 if(activation==true){  
  let nombre=ele.id  
  arrayimg.forEach(y=>{
    if(y.id==nombre){
       ele.setAttribute('src',`${y.img}`)   
      let Nombre=y.nombre      
      nombres.push(Nombre)  
     

    }
  })
 
  
  ele.classList.add('voltear') 
  
  if (nombres.length==2) {
     activation=false    
    if (parseInt(eleArray[0].id)!=parseInt(eleArray[1].id)) {
       if (nombres[0]==nombres[1]) {
          aciertos++
        acierto.play()
        setTimeout(()=>{
          eleArray.forEach(y=>{            
            y.classList.remove('voltear1')
            y.style.backgroundImage='url(img/chispas.gif)'
           
          }) 
           eleArray=[]
           nombres=[] 
            activation=true
        },1000) 
        
        if (aciertos==4&&tiempo>1) {   
            setTimeout(()=>{
            victory.play();
            activation=false           
          },1100)
          setTimeout(()=>{
           location.reload();      
          },3500)

        }
        
       }else{
       
       comprovar()
       error.play()
       
      }
    }else{
     
      comprovar()
      error.play()
    }


   
    
  }
 }

}


function comprovar() {
  setTimeout(()=>{ 
    eleArray.forEach(y=>{
      y.classList.remove('voltear')
      y.classList.add('voltear1')
      y.setAttribute('src','img/sceptic.svg')     
    
    }) 
   
    setTimeout(()=>{
      eleArray.forEach(y=>{            
        y.classList.remove('voltear1')
      }) 
       eleArray=[]
       nombres=[] 
        activation=true
    },1000)        
   
  },2000)
}

function time() {
  let interval=setInterval(() => {
    tiempo--
    limite.textContent=tiempo    
    if (tiempo==0&&aciertos<4) {     
      over.play();      
     activation=false
     setTimeout(() => {
      location.reload();
     },5000);
    clearInterval(interval)
    }else if(tiempo>0&&aciertos==4){
      clearInterval(interval)
    }
  },1000);
}