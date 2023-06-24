const recyclable_item = document.querySelectorAll(".items");
const recycle_bins = document.querySelectorAll(".bins");
const recyclable_item_container = document.querySelector(".recyclable_item_container");

const dragStart = (evt) => {
    evt.dataTransfer.setData('text/plain', evt.target.id);
}

const dragEnd = (evt) => {
    evt.target.style.visibility = 'visible';
}

const dragOver = (evt) => {
    evt.preventDefault();
}

const drop = (evt) => {
    evt.preventDefault();

    const droppedItemId = evt.dataTransfer.getData('text/plain');
    const binId = evt.target.id;
  
    if (isCorrectBin(droppedItemId, binId)) {
        const droppedItem = document.getElementById(droppedItemId);
        console.log()
        droppedItem.classList.add('hidden');
        score++;
        if (numberRecord.length < 10){
            const nextItem = pickItem();
            recyclable_item_container.removeChild();
            recyclable_item_container.insertAdjacentHTML("afterbegin", nextItem);
        } else {
            alert(`Congratulations! You are now a Recycle Star!`);
        }
    } else {
        const droppedItem = document.getElementById(droppedItemId);
        droppedItem.classList.remove('hidden');
    }
}
  
const isCorrectBin = (itemId, binId) => {
    if (itemId === 'newspapers' && binId === 'mixed_paper_bin' || 
        itemId === 'water_bottles' && binId === 'recyclable_bin' ||
        itemId === 'shampoo_bottles' && binId === 'recyclable_bin' ||
        itemId === 'soda_cans' && binId === 'recyclable_bin' ||
        itemId === 'glass_jar' && binId === 'glass_bin' ||
        itemId === 'magazine' && binId === 'mixed_paper_bin' ||
        itemId === 'paper_cup_with_lid' && binId === 'recyclable_bin' ||
        itemId === 'battery' && binId === 'return_it' ||
        itemId === 'electronics' && binId === 'return_it' ||
        itemId === 'styrofoam' && binId === 'return_it') {
        return true;
    } else {
        return false;
    }
}

const pickItem = () => {
    return fetch('../items.json')
        .then((response) => response.json())
        .then((data) => {
            const items = data;
            const randNum = Math.floor(Math.random()*items.length);
            while (numberRecord.includes(randNum)){
                randNum = Math.floor(Math.random()*items.length);
            }
            numberRecord.push(randNum);
            console.log(numberRecord);
            return `<img id=${items[randNum].id} class="items" src=${items[randNum].src} alt=${items[randNum].alt} draggable="true">`;
        })
        .catch((err) => console.log('Error:', err))
}

recyclable_item.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

recycle_bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

let numberRecord = [];

pickItem().then(data => recyclable_item_container.insertAdjacentHTML("afterbegin", data));

