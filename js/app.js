/*
 * Create a list that holds all of your cards
 */
let ulRating = document.querySelector('.stars');
let rating = 3.0;
const tiles = {
    "ANCHOR": "fa-anchor",
    "BICYCLE": "fa-motorcycle",
    "BOLT": "fa-bolt",
    "BOMB": "fa-bomb",
    "CUBE": "fa-cube",
    "DIAMOND": "fa-diamond",
    "LEAF": "fa-leaf",
    "PAPER_PLANE": "fa-paper-plane"
};
var move=0,totalOpen=0;
let cards=new Array(16);
var lastOpen;
let restart=document.querySelector('.restart');
restart.addEventListener('click',restartfunc);
restartfunc();
var starttime;
function shuffle(array) {
    var currentIndex = 16, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    for(let i=0;i<16;i++)
    {
        cards[i]=document.createElement('li');
        cards[i].className="card";
        cards[i].innerHTML="<i class=\"fa "+array[i]+"\"></i>";
    }
}
var x,minutes=0,seconds=0;
function restartfunc(){
    rating = 3.0;
    document.getElementById("demo").innerHTML = "0m 0s";
    starttime=new Date().getTime();
    clearInterval(x);
    //console.log(ulRating.childNodes);
    ulRating.children.item(0).className = "fa fa-star";
    ulRating.children.item(1).className = "fa fa-star";
    ulRating.children.item(2).className = "fa fa-star";
    var tilecards= new Array(16);
    var i=0;
    for(tile in tiles){
        tilecards[i]=tiles[tile];
        tilecards[i+1]=tiles[tile];
        i+=2;
    }
    move=0;
    totalOpen=0;
    if(move%2==0)
    document.querySelector('.moves').textContent=String(move/2);
    shuffle(tilecards);
    let deck=document.getElementsByClassName("deck")[0]; 
    var child = deck.lastElementChild;  
    while (child) { 
        deck.removeChild(child); 
        child = deck.lastElementChild; 
    } 
    for(var i=0;i<16;i++){
        deck.appendChild(cards[i]);
    }
    if(deck.childNodes.length==17)
        deck.removeChild(deck.firstChild);
    card=deck.childNodes;
    console.log(card);
    for(var i=0;i<16;i++){
        console.log(card[i]);
        let temp=card[i];
        temp.addEventListener('click',function(){
            if(!(temp.classList.contains("match") || temp.classList.contains("open")))
            {
                move++;
                if(move==1)
                {
                    starttime=new Date().getTime();
                      x = setInterval(function() {
                      var now = new Date().getTime();
                      var distance =now - starttime;
                      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                      seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        
                      // Output the result in an element with id="demo"
                      document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
                  }, 1000);
                }
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
                    setTimeout(function(){
                    if(temp.childNodes[0].className==lastOpen.childNodes[0].className)
                    {
                        temp.className = "card match";
                        lastOpen.className = "card match";
                        totalOpen++;
                        if(totalOpen==16)
                        {
                            clearInterval(x);
                            var modal1 = document.getElementById("myModal");
                            var span1 = document.getElementsByClassName("close")[0];
                            var modalcontent = document.getElementsByClassName("modal-content")[0];
                            modal1.style.display = "block";
                            modalcontent.childNodes[0].textContent="You took "+String(move/2)+" moves to finish in "+minutes+" m "+seconds+" s "+"! \n Your rating is "+String(rating)+" Stars.";
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
                        
                    }},250);
                }
            }
                if((move/2)>38){
                    rating = 0.5;
                    ulRating.children.item(0).className = "fa fa-star-half-o";
                    ulRating.children.item(1).className = "";
                    ulRating.children.item(2).className = "";
                } else if ((move/2) > 30) {
                    //If moves is greater than 30, set rating to 1 and update UI
                    rating = 1.0;
                    ulRating.children.item(0).className = "fa fa-star";
                    ulRating.children.item(1).className = "";
                    ulRating.children.item(2).className = "";
                } else if ((move/2) > 24) {
                    //If moves is greater than 24, set rating to 1.5 and update UI
                    rating = 1.5;
                    ulRating.children.item(0).className = "fa fa-star";
                    ulRating.children.item(1).className = "fa fa-star-half-o";
                    ulRating.children.item(2).className = "";
                } else if ((move/2) > 20) {
                    //If moves is greater than 20, set rating to 2 and update UI
                    rating = 2.0;
                    ulRating.children.item(0).className = "fa fa-star";
                    ulRating.children.item(1).className = "fa fa-star";
                    ulRating.children.item(2).className = "";
                } else if ((move/2) > 16) {
                    //If moves is greater than 16, set rating to 2.5 and update UI
                    rating = 2.5;
                    ulRating.children.item(0).className = "fa fa-star";
                    ulRating.children.item(1).className = "fa fa-star";
                    ulRating.children.item(2).className = "fa fa-star-half-o";
                } else {
                    //If moves is less than or equal to 16, set rating to 3 and update UI
                    rating = 3.0;
                    ulRating.children.item(0).className = "fa fa-star";
                    ulRating.children.item(1).className = "fa fa-star";
                    ulRating.children.item(2).className = "fa fa-star";
                }
        });
    }
}