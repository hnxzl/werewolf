let names = [];
let villagers = [];
let werewolfs = [];
let seers = [];
let guardians = [];
let hunters = [];
let witchs = [];

function generate() {
    let namesInput = document.getElementById("player-names").value;
    names = namesInput.split("\n");
    villagers = [...names];

    console.log(villagers.length);
    if (namesInput.length == 0)
    {
        throwError("Masukan Nama pemain!");
        return;
    }
    
    const numWerewolfs = document.getElementById("werewolfCount").value;
    const numWitchs = document.getElementById("witchCount").value;
    const numSeers = document.getElementById("seerCount").value;
    const numHunters = document.getElementById("hunterCount").value;
    const numGuards =  document.getElementById("guardCount").value;


    if (numWerewolfs < 1)
    {
        throwError("Kamu butuh setidaknya 1 Werewolf!");
        return;
    }

    for (var i = 0; i < numWerewolfs; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        werewolfs.push(selection);
    }

    for (var i = 0; i < numWitchs; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        witchs.push(selection);
    }

    for (var i = 0; i < numSeers; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        seers.push(selection);
    }

    for (var i = 0; i < numHunters; i++)
    {
        let index = Math.floor(Math.random() * villagers.length);
        let selection = villagers.splice(index, 1)[0];
        hunters.push(selection);
    }

    for (var i = 0; i < numGuards; i++)
        {
            let index = Math.floor(Math.random() * villagers.length);
            let selection = villagers.splice(index, 1)[0];
            guardians.push(selection);
        }
    
    names.forEach(name => {
        var type = 'villager';
        if (werewolfs.includes(name))
            type = 'werewolf';
        else if (seers.includes(name))
            type = 'seer';
        else if (witchs.includes(name))
            type = 'witch';
        else if (hunters.includes(name))
            type = 'hunter';
        else if (guardians.includes(name))
            type = 'guardian';
        addPlayer(name, type);
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function throwError(error) {
    document.getElementById("error").innerText = error;
}

function addPlayer(name, type) {
    let gameContainer = document.getElementById("players");
    let playerContainer = document.createElement("div");
    playerContainer.classList.add("player");
    playerContainer.innerHTML = '<img src="images/' + type + '.svg" alt="' + type + '" title="' + type + '" /><h5>' + name + '</h5><span class="skull"></span>';
    gameContainer.appendChild(playerContainer);

    playerContainer.addEventListener("click", event => {
        if (playerContainer.classList.contains("dead"))
            playerContainer.classList.remove("dead");
        else
            playerContainer.classList.add("dead");
    });
}

function endGame() {
    werewolfs = [];
    seers = [];
    witchs = [];
    villagers = [];
    hunters = [];
    guardians = [];

    document.getElementById("players").innerHTML = "";
    document.getElementById("setup").style.display = "grid";
    document.getElementById("game").style.display = "none";
}

window.onload = function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", generate);
    var endButton = document.getElementById("end");
    endButton.addEventListener("click", endGame);
}