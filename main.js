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

function punchHits() {
    // Получаем силу удара от 1 до 20
    const punch = Math.ceil(Math.random() * 20);
    return punch;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    
    // Отнимаем здоровье
    player.hp -= punchHits();

    // Если здоровье 0 или меньше устанавливаем style.width = 0
    if (player.hp <= 0 ) { 
        $playerLife.style.width = 0;
        player.hp = 0;

        // Отлючаем кнопку
        $randButton.disabled = true;
        return true;
    };

    $playerLife.style.width = player.hp + '%';
};

// Функция получает имя победителя и создает блок с именем победителя 
function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' WINS!';

    return $winTitle;
};
// Функция выводит блок с сообщением о ничьей
function doubleKill() {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' DOUBLE KILL!';

    return $winTitle;
};


$randButton.addEventListener('click', function() {
    const p1 = changeHP(player1);
    const p2 = changeHP(player2);

    if (p1 && p2) {
        // Если ничья выводим сообшение double kill
        $arenas.appendChild(doubleKill());
    } else if (p1) {
        // Если игрок 1 проиграл выводим имя 2 игрока
        $arenas.appendChild(playerWin(player2.name));
    } else if (p2) {
        // Если игрок 2 проиграл выводим имя 1 игрока
        $arenas.appendChild(playerWin(player1.name));
    };
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
