(() =>{
    const cardBoard = document.querySelector(".cardboard")
 
    const images = ['bullbasaur.png','pikachu.png', 'meowth.png', 'psyduck.png', 'squirtle.png', 'snorlax.png', 'pokeball.png', 'charmander.png']
    const backCard = 'back-face.png'
    let cardHTML = ""
    let takeCard = false
    let points = 0    
    
    images.forEach(img => {
        cardHTML += `<div class="card flip" data-card="${img}"">
                        <img class="front" src="img/${img}">
                        <img class="faced"src="img/${backCard}">
                    </div>`
    })
    
    //Here Starts the TimeWatch
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    //define vars to hold display
    let displaySeconds = 0
    let displayMinutes = 0
    let displayHours = 0
    
    function timeWatch(){
        seconds++;
        if(seconds / 60 === 1){
            seconds = 0;
            minutes++;
            if(minutes / 60 ===1){
                minutes = 0;
                hours++;
            }
        }
        //if secons/minutes/hours are only one digit, add a leading  to the value
        if(seconds < 10){
            displaySeconds = `0${seconds.toString()}`
        }else{
            displaySeconds = seconds
        }
        if(minutes < 10){
            displayMinutes = `0${minutes.toString()}`;
        }else{
            displayMinutes = minutes
        }
        if(hours < 10){
            displayHours = `0${hours.toString()}`
        }else{
            displayHours = hours
        }

        //Display updated values
        document.getElementById('display').innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    }
    
    //finish stopwacht

    cardBoard.innerHTML = cardHTML + cardHTML
    
    const cards = document.querySelectorAll(".card")
    
    cards.forEach(card =>{
        let random = Math.floor(Math.random()* 12)
        card.style.order = random
    })
    
    setTimeout(()=> {
        cards.forEach(card =>{
            card.classList.remove("flip")
        })
        window.setInterval(timeWatch, 1000)
    },3000)

    
    //setting the first and second cards
    let firstCard;
    let secondCard;
    
    function flipCard(){
        //lock the card
        if(takeCard){
            return false
        }
        //chose the card and flip
        this.classList.add("flip")
    
        if(!firstCard){
            firstCard = this;
            return false
        }
        secondCard = this
        checkPoint()
    }
    
    function checkPoint(){
        //if the cards match then get 1 point and keep them turned
        let isMatch = firstCard.dataset.card === secondCard.dataset.card
        if(!isMatch){//if the cards isn't mach then return the cards
            returnCard()
        }else{
            resetCards(isMatch)
            points += 1
            let score = document.getElementById("score")
            score.innerText =`Score: ${points}`
            if(points === 8){
                window.alert("You Win")
            }
        }    
    }
    
    function returnCard(){
        //if the cards isn't match, flip them again
        takeCard = true
        setTimeout(() => {
            firstCard.classList.remove("flip")
            secondCard.classList.remove("flip")
            resetCards()
        }, 1500)
    }
    
    function resetCards(isMatch = false) {
        if (isMatch){ //disallow you to take the same flipped card and chose other.
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)
        }
        //clean the variables to allow you chose another card
        firstCard = null
        secondCard = null
        takeCard = false
    }
    
    cards.forEach(card => card.addEventListener('click', flipCard));
})()

