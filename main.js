const $arenas = document.querySelector('.arenas');
const $randButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        'sword',
        'shuriken',
        'kunai'
    ],
    attack: function() {
        return console.log('Fight...' + this.name);
    }
};

const player2 = {
    player: 2,
    name: 'LIU KANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: [
        'sword',
        'shuriken',
        'kunai'
    ],
    attack: function() {
        return console.log('Fight...' + this.name);
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    
    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    return $player;
};

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const punchHits = Math.ceil(Math.random() * 20);

    player.hp -= punchHits;

    if (player.hp <= 0 ) { 
        $playerLife.style.width = 0;

        $randButton.disabled = true;
        return true;

    } else {
        $playerLife.style.width = player.hp + '%';
    };
    
    console.log(player.name + '-' + player.hp);
};

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' WINS!';

    return $winTitle;
};

$randButton.addEventListener('click', function() {
    if (changeHP(player1)) {
        $arenas.appendChild(playerWin(player2.name));
    };
    
    if (changeHP(player2)) {
       $arenas.appendChild(playerWin(player1.name));
    };
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
