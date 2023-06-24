const recyclable_item = document.querySelectorAll(".recyclable_item");
const recycle_bins = document.querySelectorAll(".bins");

const dragStart = (evt) => {
    evt.dataTransfer.setData('text/plain', evt.target.id);
}

const dragEnd = (evt) => {
    evt.target.style.visibility = 'visible';
}

const dragOver = (evt) => {
    evt.preventDefault();
}

function drop(evt) {
    evt.preventDefault();

    const droppedItemId = evt.dataTransfer.getData('text/plain');
    const binId = evt.target.id;
  
    if (isCorrectBin(droppedItemId, binId)) {
        const droppedItem = document.getElementById(droppedItemId);
        droppedItem.classList.add('hidden');
    } else {
        const droppedItem = document.getElementById(droppedItemId);
        droppedItem.classList.remove('hidden');
    }
}
  
function isCorrectBin(itemId, binId) {
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

recyclable_item.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

recycle_bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

