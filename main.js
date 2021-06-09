const $arenas = document.querySelector('.arenas');
// const $randButton = document.querySelector('.button');
const $fightForm = document.querySelector('.control')

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
    changeHP,
    elHP,
    renderHP,
    attack,
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
    changeHP,
    elHP,
    renderHP,
    attack
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = [
    'head',
    'body',
    'foot'
];

function attack() {

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

function getRandom(num) {
    // Получаем силу удара от 1 до 20
    const randNum = Math.ceil(Math.random() * num);
    return randNum;
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

// $randButton.addEventListener('click', function() {
//     // Вызываем метод изменения здоровья
//     player1.changeHP(getRandom(20));
//     // Вызываем метод отображения здоровья
//     player1.renderHP();

//     player2.changeHP(getRandom(20))
//     player2.renderHP();
    
//     if (player1.hp === 0 || player2.hp === 0) {
//         // Отлючаем кнопку
//         $randButton.disabled = true;
//         getWinner();
//         // Вызываем фунцию создания кнопки перезагрузки
//         createReloadButton();
//     }
// });

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

$fightForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const enemy = enemyAttack();
    const attack = {};

    for (let item of $fightForm) {
        if (item.checked && item.name === 'hit') {
            // console.log(item.value);
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
        // console.log(item);
    };

    if (attack.hit != enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
    } 
    
    if (attack.defence != enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    if (player1.hp === 0 || player2.hp === 0) {
        // Отлючаем кнопку и выбор действий
        for (let i of $fightForm) {

            if (i.type === 'submit') {
                i.disabled = true;
            }

            if (i.type === 'radio') {
                i.disabled = true;
            }
        }
        // Выводим победителя
        getWinner();
        // Вызываем фунцию создания кнопки перезагрузки
        createReloadButton();
    }
    console.log('###: p', attack);
    console.log('###: e', enemy);
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

