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
list=list.filter(c=>c.name.includes(search.value));
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
<img src="${card.image}" loading="lazy" onclick="showLightbox('${card.image}')">
<p class="name">${card.name}</p>
<p class="sub">${card.subType||''}</p>
<p class="desc">${card.desc||''}</p>
`;

container.appendChild(div);
});
}

/* 搜索实时触发 */
let search=document.getElementById('searchBox');
if(search){
search.oninput=updateView;
}

/* 弹窗功能 */
function showLightbox(src){
let lb=document.getElementById('lightbox');
let img=document.getElementById('lightboxImg');
img.src=src;
lb.style.display='flex';
}
function closeLightbox(){
document.getElementById('lightbox').style.display='none';
}
