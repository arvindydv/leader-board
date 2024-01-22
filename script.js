let players = [
    {   
        id: 1,
        fname: "Arvind",
        lname: "Yadav",
        country: "India",
        score: 90,
        timestamp: "Jan 2024, 14:02:50"
    },
    {   
        id: 2,
        fname: "Kapil",
        lname: "Yadav",
        country: "India",
        score: 95,
        timestamp: "Jan 2024, 14:02:50"
    }
];


// console.log(formattedDate);

const playerContainer = document.querySelector(".players");

// display data
const displayData = ()=>{
    // sort data
         players.sort((a,b)=>{
            return b.score - a.score;
         });
           
         playerContainer.innerHTML = "";
         players.forEach((data) => {
            const div = document.createElement("div");
            div.setAttribute("class", "player");
            div.innerHTML = `
            <input type="hidden" value="${data.id}">
            <div>
            <p><span class="p-fname">${data.fname}</span> <span class="p-lname">${data.lname}</span></p>
            <p>${data.timestamp}</p>
          </div>
          <div >
              <p class="p-country">${data.country}</p>
          </div>
          <div>
              <p class="p-score">${data.score}</p>
          </div>
         <div>
           <p class="delete">x</p>
         </div> 
         <div>
          <p class="increase">+5</p>
         </div>
         <div>
          <p class="decrease">-5</p>
         </div>
            ` ;
             
            playerContainer.appendChild(div);
         });

}


// get form data
document.getElementById("players-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    const currentDate = new Date();
const formattedDate = currentDate.toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});
      
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const score = document.getElementById("score").value;
    const country = document.getElementById("country").value;
    let id = players.length +1;
     
    if(!fname || !lname || !score || !country){
        alert("All fields are required");
        return;
    }

    const playersData = {
        id: id,
        fname: fname,
        lname: lname,
        score: Number(score),
        country: country,
        timestamp: formattedDate
    }
    
    players.push(playersData);
    displayData();
    
})

// increase score
const increaseScore = (id)=>{
    const playerIdx = players.findIndex(player => player.id == Number(id));
    const score = players[playerIdx].score+5;
    players[playerIdx].score = score;
    displayData();
}

// decrease score
const decreaseScore = (id)=>{
    const playerIdx = players.findIndex(player => player.id == Number(id));
    const score = players[playerIdx].score-5;
    players[playerIdx].score = score;
    displayData();
}

// remove playe from leader board
const removePlayer = (id)=>{
    const playerIdx = players.findIndex(player => player.id == Number(id));
    players.splice(playerIdx, 1);
    displayData();
}

playerContainer.addEventListener("click", (e)=>{

    if(e.target.innerText === "+5"){
        const id = e.target.parentNode.parentNode.childNodes[1].value;
        increaseScore(id);
    } else if(e.target.innerText === "-5"){
        const id = e.target.parentNode.parentNode.childNodes[1].value;
        decreaseScore(id);
    } else if(e.target.innerText ==="x"){
        const id = e.target.parentNode.parentNode.childNodes[1].value;
        removePlayer(id);
    }

})

document.addEventListener("DOMContentLoaded", displayData());
