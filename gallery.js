let allCards=[];
let currentSub='全部';

fetch('cards.json')
.then(res=>res.json())
.then(data=>{
allCards=data.filter(c=>c.bigType===MAIN_TYPE);

if(document.getElementById('subFilter')){
buildSubFilter();
}

updateView();
});

function buildSubFilter(){
let subDiv=document.getElementById('subFilter');
if(!subDiv) return;

let subs=[...new Set(allCards.map(c=>c.subType))];
subs.unshift('全部');

subs.forEach(s=>{
let btn=document.createElement('button');
btn.innerText=s;
btn.onclick=()=>{
currentSub=s;
updateView();
};
subDiv.appendChild(btn);
});
}

function updateView(){

let list=allCards.filter(c=>{
if(currentSub==='全部') return true;
return c.subType===currentSub;
});

let search=document.getElementById('searchBox');
if(search && search.value){
list=list.filter(c=>
c.name.includes(search.value)
);
}

showCards(list);
}

function showCards(cards){
let container=document.getElementById('cardContainer');
container.innerHTML='';

cards.forEach(card=>{
let div=document.createElement('div');
div.className='card';

div.innerHTML=`
<img src="${card.image}">
<p>${card.name}</p>
<p>${card.subType||''}</p>
<p>${card.desc||''}</p>
`;

container.appendChild(div);
});
}

let search=document.getElementById('searchBox');
if(search){
search.oninput=updateView;
}
