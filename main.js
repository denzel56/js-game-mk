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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
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

function punchHits(hit) {
    // Получаем силу удара от 1 до 20
    const punch = Math.ceil(Math.random() * hit);
    return punch;
}

function changeHP(hit) {
    // Отнимаем здоровье
    this.hp -= hit;

    // Если здоровье 0 или меньше устанавливаем hp = 0
    if (this.hp <= 0 ) { 
        this.hp = 0;
    };
};

function elHP() {
    // Получаем блок здоровья игрока
    const $player = document.querySelector('.player' + this.player + ' .life');
    
    return $player;
};

function renderHP() {
    // Отображаем изменение шкалы здоровья
    const $playerLife = this.elHP();

    $playerLife.style.width = this.hp + '%';
};

// Функция получает имя победителя и создает блок с именем победителя 
function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' WINS!';
    } else {
        // Выводим блок с сообщением о ничьей
        $winTitle.innerText = 'DOUBLE KILL!';
    };

    return $winTitle;
};

function getWinner() {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        // Если игрок 1 проиграл выводим имя 2 игрока
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        // Если игрок 2 проиграл выводим имя 1 игрока
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        // Если ничья выводим сообшение double kill
        $arenas.appendChild(playerWin());
    };
};

function createReloadButton() {
    // Создаем кконтейнер и кнопку перезагрузки
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    // $reloadButton.style.marginTop = '0';

    // Добавляем кнопку в DOM-дерево
    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

    // Обрабатываем клик по кнопке
    $reloadButton.addEventListener('click', function() {
        // Обновляем страницу
        window.location.reload();
    });
};

$randButton.addEventListener('click', function() {
    // Вызываем метод изменения здоровья
    player1.changeHP(punchHits(20));
    // Вызываем метод отображения здоровья
    player1.renderHP();

    player2.changeHP(punchHits(20))
    player2.renderHP();
    
    if (player1.hp === 0 || player2.hp === 0) {
        // Отлючаем кнопку
        $randButton.disabled = true;
        getWinner();
        // Вызываем фунцию создания кнопки перезагрузки
        createReloadButton();
    }
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

