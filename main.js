// Settring Game name
let gamename = "Guess the word"
document.querySelector(`title`).innerHTML = gamename
document.querySelector(`h1`) .innerHTML= gamename
document.querySelector(`footer`).innerHTML = `${gamename} Game Created by Abdelrahman Hany`;

// Fetching API
    fetch("https://random-word-api.herokuapp.com/word?number=1")
  .then(res => res.json())
  .then(data => {
      let w = data[0];
      console.log(w);
      let word = w.toUpperCase();
    GenerateInputs(word);
  })
// setting Game option

let numberOfTries = 6;
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
            if (indexToFill !== -1) randomInput.value = word[indexToFill].toUpperCase();

            // console.log(randomIndex);
            // console.log(emptyInputs);
            // console.log(randomInput);
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


