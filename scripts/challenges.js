const challenge_name = document.querySelector(".challenge_name");
const iframe_div = document.querySelector(".iframe");
const find_challenge_button = document.querySelector(".find_challenge_button");

let prev = 0;

const findChallenge = async() => {
    const challenge = await pickItem();
    challenge_name.innerHTML = `Your Challenge is: ${challenge.name}`;
    const iframe = document.querySelector('.iframe iframe');
    if (iframe) {
        const parentContainer = iframe.parentNode;
        parentContainer.removeChild(iframe);
    }
    iframe_div.insertAdjacentHTML("beforeend" ,challenge.iframe);
}

const pickItem = () => {
    return fetch('../challenges.json')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const items = data;
            let randNum = Math.floor(Math.random()*items.length);
            while (prev == randNum){
                randNum = Math.floor(Math.random()*items.length);
            }
            prev = randNum;
            console.log(items[randNum]);
            return items[randNum];
        })
        .catch((err) => console.log('Error:', err))
}

find_challenge_button.addEventListener('click', findChallenge);
