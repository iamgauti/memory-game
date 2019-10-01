/*
 * Create a list that holds all of your cards
 */
var card=document.getElementsByClassName("card");
restartfunc();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var move=0,totalOpen=0;
var lastOpen;
let restart=document.querySelector('.restart');
restart.addEventListener('click',restartfunc);
// Shuffle function from http://stackoverflow.com/a/2450976
function restartfunc(){
    move=0;
    if(move%2==0)
    document.querySelector('.moves').textContent=String(move/2);
    card=shuffle(card);
    let deck=document.getElementsByClassName("deck")[0];
    for(var i=0;i<16;i++){
        deck.appendChild(card[i]);
        let temp=card[i];
        temp.addEventListener('click',function(){
            if(!(temp.classList.contains("match") || temp.classList.contains("open")))
            {
                move++;
                if(move%2==0)
                document.querySelector('.moves').textContent=String(move/2);
                temp.classList.add("open");
                temp.classList.add("show");
                if((move%2)==1)
                {
                    lastOpen=temp;
                    totalOpen++;
                }
                else
                {
                    if(temp.childNodes[1].className==lastOpen.childNodes[1].className)
                    {
                        temp.className = "card match";
                        lastOpen.className = "card match";
                        totalOpen++;
                        if(totalOpen==16)
                        {
                            alert("You won using "+String(move)+" moves!");
                            return;
                        }
                    }
                    else
                    {
                        setTimeout(function(){
                            temp.className = "card";
                            lastOpen.className = "card";
                            totalOpen--;
                        },500);
                    }
                }
            }
        });
    }
}
function shuffle(array) {
    var currentIndex = 16, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        array[currentIndex].className = "card";
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
