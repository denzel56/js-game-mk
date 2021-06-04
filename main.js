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
    // Получаем силу удара от 1 до 20
    const punchHits = Math.ceil(Math.random() * 20);

    // Отнимаем здоровье
    player.hp -= punchHits;

    // Если здоровье 0 или меньше устанавливаем style.width = 0
    if (player.hp <= 0 ) { 
        $playerLife.style.width = 0;

        // Отлючаем кнопку
        $randButton.disabled = true;
        return true;

    } else {
        // Иначе устанавливаем новое значение здоровья
        $playerLife.style.width = player.hp + '%';
    };
};

// Функция получает имя победителя и создает блок с именем победителя 
function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' WINS!';

    return $winTitle;
};

$randButton.addEventListener('click', function() {
    // Если игрок 1 проиграл выводим имя 2 игрока
    if (changeHP(player1)) {
        $arenas.appendChild(playerWin(player2.name));
    };
    
    // Если игрок 2 проиграл выводим имя 1 игрока
    if (changeHP(player2)) {
       $arenas.appendChild(playerWin(player1.name));
    };
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
