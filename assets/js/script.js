

let state = {
    word: "",
}

// variables
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector('.results-word');
const soundButton = document.querySelector('.results-sound');


const insertWord = () =>{
    containerWord.innerText = state.word;
}


const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!state.word.trim()) return;

    try{
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();

        if(response.ok && data.length){
            insertWord();
        }
    } catch(err){
        console.log(err);
    }
}

const handleKayup = (e) => {
   const value = e.target.value;
   state.word = value;
}


// events
input.addEventListener('keyup', handleKayup);
form.addEventListener('submit', handleSubmit);
soundButton.addEventListener('click', handleSound);