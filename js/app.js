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
var mins=0,secs=0;
function countdown() { 
    setTimeout('Increment()', 60); 
} 
function getminutes() { 
    mins = Math.floor(secs / 60); 
    return mins; 
} 
function getseconds() { 
    return secs - Math.round(mins * 60); 
} 
function Increment() { 
    if (document.getElementById) { 
        minutes = document.getElementById("minutes"); 
        seconds = document.getElementById("seconds"); 
        if (seconds < 59) { 
            seconds.value = secs; 
        }
        else { 
            minutes.value = getminutes(); 
            seconds.value = getseconds(); 
        } 
        secs++; 
		setTimeout('Increment()', 1000);
    }
}
var move=0,totalOpen=0;
var lastOpen;
let restart=document.querySelector('.restart');
restart.addEventListener('click',restartfunc);
// Shuffle function from http://stackoverflow.com/a/2450976
function restartfunc(){
    move=0;
    totalOpen=0;
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
                    if(totalOpen==1)
                        countdown();
                }
                else
                {
                    setTimeout(function(){
                    if(temp.childNodes[1].className==lastOpen.childNodes[1].className)
                    {
                        temp.className = "card match";
                        lastOpen.className = "card match";
                        totalOpen++;
                        if(totalOpen==16)
                        {
                            var modal1 = document.getElementById("myModal");
                            var span1 = document.getElementsByClassName("close")[0];
                            var modalcontent = document.getElementsByClassName("modal-content")[0];
                            modal1.style.display = "block";
                            modalcontent.childNodes[0].textContent="You took "+String(move/2)+" moves to finish!";
                            span1.onclick = function() {
                            modal1.style.display = "none";
                            }
                            window.onclick = function(event) {
                            if (event.target == modal1) {
                                modal1.style.display = "none";
                            }
                            }
                        }
                    }
                    else
                    {
                            temp.className = "card";
                            lastOpen.className = "card";
                            totalOpen--;
                        
                    }},500);
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
