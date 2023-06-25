const recyclable_item = document.querySelector(".items");
const recycle_bins = document.querySelectorAll(".bins");
const recyclable_item_container = document.querySelector(".items");
const score_text = document.querySelector(".score");
const mini_game = document.querySelector(".mini_game");
const play_again = document.querySelector(".play_again");

const dragStart = (evt) => {
    evt.dataTransfer.setData('text/plain', evt.target.id);
}

const dragEnd = (evt) => {
    evt.target.style.visibility = 'visible';
}

const dragOver = (evt) => {
    evt.preventDefault();
}

const drop = async(evt) => {
    evt.preventDefault();

    const droppedItemId = evt.dataTransfer.getData('text/plain');
    const binId = evt.target.id;
  
    if (isCorrectBin(droppedItemId, binId)) {
        const droppedItem = document.getElementById(droppedItemId);
        droppedItem.classList.add('hidden');
        score++;
        score_text.innerHTML = `Score: ${score}/10`;
        if (numberRecord.length < 10){
            pickItem().then(nextItem => {
                recyclable_item_container.innerHTML = nextItem;
                attachEventListeners();
            });
        } else {
            alert(`Congratulations! You are now a Recycle Star!`);
            play_again.classList.remove('nonvisible');
        }
    } else {
        const droppedItem = document.getElementById(droppedItemId);
        droppedItem.classList.remove('hidden');
    }
}
  
const isCorrectBin = (itemId, binId) => {
    if (itemId.includes(binId)) {
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
            let randNum = Math.floor(Math.random()*items.length);
            while (numberRecord.includes(randNum)){
                randNum = Math.floor(Math.random()*items.length);
            }
            numberRecord.push(randNum);
            console.log(numberRecord);
            return `<img id=${items[randNum].id + "_" + items[randNum].bin} class="items" src=${items[randNum].src} alt=${items[randNum].alt} draggable="true">`;
        })
        .catch((err) => console.log('Error:', err))
}

const restart = () => {
    numberRecord = [];
    score = 0;
    score_text.innerHTML = `Score: ${score}/10`;
    play_again.classList.add("nonvisible");
    render();
}

let numberRecord = [];
let score = 0;

play_again.addEventListener("click", restart);

const attachEventListeners = () => {
    recyclable_item.addEventListener('dragstart', dragStart);
    recyclable_item.addEventListener('dragend', dragEnd);

    recycle_bins.forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('drop', drop);
    });
};

const render = async () => {
    const nextItem = await pickItem();
    recyclable_item_container.innerHTML = nextItem;
    attachEventListeners();
};

render();
