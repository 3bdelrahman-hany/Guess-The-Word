// Settring Game name
let gamename = "Guess the word"
document.querySelector(`title`).innerHTML = gamename
document.querySelector(`h1`) .innerHTML= gamename
document.querySelector(`footer`).innerHTML = `${gamename} Game Created by Abdelrahman Hany`;

// Fetching API
let random=['Animals','Sports','Programming Languages','Games',"Wordle","Countries","Capitals of Countries","Birds"];

let randValue=random[Math.floor(Math.random()*8)];
console.log(randValue);

switch(randValue){
  case 'Animals' :
    async function getAnimals() {
      try {
        let response = (await fetch("https://random-words-api.kushcreates.com/api?language=en&category=animals"));
        let theword = await response.json()
        let value = theword[Math.floor(Math.random()*140)].word
        GenerateInputs(value)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    getAnimals();
    break;

  case 'Sports':
    async function getSports() {
      try {
        let response = (await fetch("https://random-words-api.kushcreates.com/api?language=en&category=sports"));
        let theword = await response.json()
        let value = theword[Math.floor(Math.random()*78)].word
        
        GenerateInputs(value)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    getSports();

    break;
  case "Games":
    async function getGames() {
      try {
        let response= (await fetch("https://random-words-api.kushcreates.com/api?language=en&category=games"))
        let theword=await response.json()
        let value=theword[Math.floor(Math.random()*88)].word;
        
        GenerateInputs(value)
      } catch (error) {
          console.log("Error fetching data:", error);
      }
    }

    getGames();
    break;

  case "Capitals of Countries":
    async function getCapitalsOfCountries() {
      try {
        let response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=capitals_of_countries");
        let theword= await response.json()
        let value=theword[Math.floor(Math.random()*201)].word
        GenerateInputs(value)
      } catch (error) {
          console.log("Error fetching data:", error);
      }
    }

    getCapitalsOfCountries();
    break;
  case "Programming Languages":
      async function getPL(){
        try {
          let response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=programming_languages")
          let Words =  await response.json();
          let value = Words[Math.floor(Math.random()*57)].word;
          GenerateInputs(value);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
      }
      getPL();
      break;

  case "Countries":
    async function getCountry(){
        try {
          let response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=countries");
          let Words =  await response.json();
          let value = Words[Math.floor(Math.random()*200)].word;
          GenerateInputs(value);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
      }
      getCountry();
      break;
  
  case"Birds":
      async function getBird(){
        try {
          let response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=birds");
          let Words =  await response.json();
          let value = Words[Math.floor(Math.random()*60)].word;
          GenerateInputs(value);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
      }
      getBird();
      break;

  case"Wordle":
      async function getWordle(){
        try {
          let response = await fetch("https://random-words-api.kushcreates.com/api?language=en&category=wordle");
          let Words =  await response.json();
          let value = Words[Math.floor(Math.random()*14855)].word;
          GenerateInputs(value);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
      }
      getWordle();
      break;

}


// setting Game option

let numberOfTries = 5;
let currentTryies = 1;
let numberOfLetters  = 0;
let messageBox = document.querySelector(`.message`);
let numberOfHints = 3;



// Generating Inputs

function GenerateInputs(word){
    numberOfLetters = word.length;
    // console.log(numberOfLetters);


    // manage  hints
    document.querySelector('.hint span').innerHTML = `${numberOfHints}`;
    const hintBtn = document.querySelector('.hint');
    hintBtn.addEventListener("click", getHiint);


    let inputsContainer= document.querySelector(`.inputs`);
    // create main try div
    for(let i = 1 ; i<=numberOfTries ; i++){

        let TryDiv = document.createElement(`div`)
        TryDiv.classList.add (`try-${i}`)

        TryDiv.innerHTML = `<span>Try ${i}</span>`


        if (i !== 1) TryDiv.classList.add("inactive-input") 
        //  create inputs
        for (let j = 1 ;j <= numberOfLetters;j++){
            const input = document.createElement('input')
            input.type="text";
            input.id=`guess${i}-letter${j}`
            input.setAttribute("maxlength","1")
           
            TryDiv.appendChild(input)
        }   
        
        inputsContainer.appendChild(TryDiv);
        
    }
    inputsContainer.children[0].children[1].focus();

    // disable inputs except first input
    const inputsInActiveDiv = document.querySelectorAll(`.inactive-input input`);

    inputsInActiveDiv.forEach(input => {input.disabled = true});


    const allinputs = document.querySelectorAll(`input`);

    allinputs.forEach((input,index) => {
    //    convert input to uppercase
        input.addEventListener("input",function(){
            this.value = this.value.toUpperCase();
            // console.log(index);
            // console.log(this.value);

            // focus next input
            const nextInput = allinputs[index + 1];
            if (index + 1 < allinputs.length) nextInput.focus()
        })


         input.addEventListener("keydown", function(event) {
            // console.log(event);
            const currentIndex = Array.from(allinputs).indexOf(event.target);
            // console.log(currentIndex);
            if(event.key == "ArrowRight"){
                const nextInput = currentIndex + 1;
                if (nextInput < allinputs.length) allinputs[nextInput].focus();
            }

               if(event.key == "ArrowLeft"){
                const previousInput = currentIndex -1 ;
                if (previousInput >=0) allinputs[previousInput].focus();
            }
         }
        )
    });


    const checkBtn = document.querySelector(`.check`);
    checkBtn.addEventListener("click", GuessWord);
    function GuessWord() {
        let success = true;
        for(let i =1 ;i<= word.length ; i++){
            const inputField = document.getElementById(`guess${currentTryies}-letter${i}`);
            const inputValue = inputField.value;
            // console.log(inputValue);
            let actualLetter = word[i-1];
            // console.log(actualLetter);

            // game logic
            if(inputValue === actualLetter){
                // correct letter
                inputField.classList.add("correct-letter");
            } else if (word.includes(inputValue) && inputValue != ""){
                // wrong position
                inputField.classList.add("wrong-position");
                success = false;
            } else {
                // letter not in word
                inputField.classList.add("letter-not-in-word");
                success = false;
            }
    }
        // check if user guessed the word
        if (success){
        //    console.log("You Win!");
              messageBox.innerHTML = `Congratulations! You guessed the word! 🎉 after  ${currentTryies} tries.`;
              messageBox.classList.add("success-message");
              checkBtn.disabled = true;
            //   add inactive class to all tries
              const alltries = document.querySelectorAll(`.inputs > div `);
              alltries.forEach(tryDiv => {tryDiv.classList.add("inactive-input")});
              return;
        }else{
            
            document.querySelector(`.try-${currentTryies}`).classList.add("inactive-input");
            const currentTryInputs = document.querySelectorAll(`.try-${currentTryies} input`);
            // disable current try inputs
            currentTryInputs.forEach(input => {input.disabled = true});
            // move to next try
            currentTryies++;

            // check if user has tries left
            if (currentTryies > numberOfTries){
                // game over
                // console.log(`Game Over! The word was ${word}`);
                messageBox.innerHTML = `Game Over! The word was ${word} ❌`;
                messageBox.classList.add("error-message");
                checkBtn.disabled = true;
                hintBtn.disabled = true;
                return;
            } else {
                // enable next try inputs
                const nextTryInputs = document.querySelectorAll(`.try-${currentTryies} input`);
                nextTryInputs.forEach(input => {input.disabled = false});
                document.querySelector(`.try-${currentTryies}`).classList.remove("inactive-input");
                // focus first input of next try
                document.getElementById(`guess${currentTryies}-letter1`).focus();
            }
        }

    }


    function getHiint(){
        if (numberOfHints > 0){
            numberOfHints--;
            document.querySelector('.hint span').innerHTML = `${numberOfHints}`;
        } 
        if (numberOfHints === 0){
            hintBtn.disabled = true;
        }

        const enableInputs = document.querySelectorAll("input:not([disabled])");
        // console.log(enableInputs);
        const emptyInputs = Array.from(enableInputs).filter(input => input.value === "");
        // console.log(emptyInputs);
        if (emptyInputs.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyInputs.length);
            const randomInput = emptyInputs[randomIndex];
            const indexToFill = Array.from(allinputs).indexOf(randomInput);
            randomInput.value = word[indexToFill];
            // randomInput.value = word.charAt(randomIndex);


            console.log(randomIndex);
            console.log(emptyInputs);
            console.log(randomInput);
            console.log(randomInput.value);
        }

    }

    function handleBackspace(event){
        if(event.key == "Backspace"){
        const inputs= document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentIndex);
        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const previousInput = inputs[currentIndex - 1];
            currentInput.value = "";
            previousInput.value = "";

            previousInput.focus();
            event.preventDefault();
        }
    }
  }

  document.addEventListener("keydown", handleBackspace)
}


