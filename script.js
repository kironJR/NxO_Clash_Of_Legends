let allCards=[];
let currentMain='角色';
let currentSub='全部';

fetch('cards.json')
.then(res=>res.json())
.then(data=>{
allCards=data;
buildSubFilter();
updateView();
});

function showCards(cards){
let container=document.getElementById('cardContainer');
container.innerHTML='';

cards.forEach(card=>{
let div=document.createElement('div');
div.className='card';

div.innerHTML=`
<img src="${card.image}">
<p class="name">${card.name}</p>
<p class="sub">${card.subType||''}</p>
<p class="desc">${card.desc||''}</p>
`;

container.appendChild(div);
});
}

function selectMain(type){
currentMain=type;
currentSub='全部';
buildSubFilter();
updateView();
}

function selectSub(type){
currentSub=type;
updateView();
}

function buildSubFilter(){
let subDiv=document.getElementById('subFilter');
subDiv.innerHTML='';

let subs=[...new Set(
allCards
.filter(c=>c.bigType===currentMain)
.map(c=>c.subType)
)];

subs.unshift('全部');

subs.forEach(s=>{
let btn=document.createElement('button');
btn.innerText=s;
btn.onclick=()=>selectSub(s);
subDiv.appendChild(btn);
});
}

function updateView(){
let filtered=allCards.filter(c=>{
if(c.bigType!==currentMain) return false;
if(currentSub==='全部') return true;
return c.subType===currentSub;
});

showCards(filtered);
}
