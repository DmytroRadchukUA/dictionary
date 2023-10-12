

let state = {
    word: "",
    meanings: [],
    phonetics: [],
}

// variables
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const results = document.querySelector('.results');
const containerWord = document.querySelector('.results-word');
const soundButton = document.querySelector('.results-sound');
const resultsList = document.querySelector('.results-list');

const renderDefinition = (itemDefinition) => {
    const example = itemDefinition.example ? ` 
            <div class="results-item__example">
                <p> Example: <span>${itemDefinition.example}</span></p>
            </div>
        `: ''; 
    return `
            <div class="results-item__defenition">
                <p>${itemDefinition.definition}</p>
                ${example}
            </div>
        `
}

const getDefinitions = (definitions) => {
    return definitions.map(renderDefinition).join('');
    };

const renderItem = (item) => {
    return ` <div class="results-item">
                <div class="results-item__part">${item.partOfSpeech}</div>
                <div class="results-item__defenitions">
                    ${getDefinitions(item.definitions)}
                </div>
            </div>`
}

const showResults = () =>{
    resultsList.innerHTML = '';
    results.style.display = 'block';

    state.meanings.forEach((item)=>{
        resultsList.innerHTML += renderItem(item);
    })
}


const insertWord = () =>{
    containerWord.innerText = input.value;
}

const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!state.word.trim()) return;

    try{
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();

        if(response.ok && data.length){
            const item = data[0];

            state = {
                ...state,
                meanings: item.meanings,
                phonetics: item.phonetics,
            }
            insertWord();
            showResults();
        }
    } catch(err){
        console.log(err);
    }
}

const handleKayup = (e) => {
   const value = e.target.value;
   state.word = value;
}

const handleSound = () =>{
    if(state.phonetics.length){
        const sound = state.phonetics[0];

        if(sound.audio){
            new Audio(sound.audio).play()
        }
    }
}


// events
input.addEventListener('keyup', handleKayup);
form.addEventListener('submit', handleSubmit);
soundButton.addEventListener('click', handleSound);