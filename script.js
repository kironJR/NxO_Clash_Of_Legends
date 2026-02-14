let allCards=[];

fetch('cards.json')
.then(res=>res.json())
.then(data=>{
allCards=data;
showCards(data);
});

function showCards(cards){
let container=document.getElementById('cardContainer');
container.innerHTML='';

cards.forEach(card=>{
let div=document.createElement('div');
div.className='card';

div.innerHTML=`
<img src="${card.image}">
<p>${card.name}</p>
`;

container.appendChild(div);
});
}

function filterType(type){
if(type==='全部'){
showCards(allCards);
return;
}

let filtered=allCards.filter(c=>c.bigType===type);
showCards(filtered);
}
