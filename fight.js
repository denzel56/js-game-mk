// Подключаем функции и переменные
import getRandom from './utils.js';
import {$fightForm, $arenas} from './main.js'
import { createElement } from './utils.js';
import { generateLogs, getLogMessage } from './fight_logs.js';

export const player1 = {
    player: 1,
    name: 'SUBZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        'sword',
        'shuriken',
        'kunai'
    ],
    attack
};

export const player2 = {
    player: 2,
    name: 'LIU KANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: [
        'sword',
        'shuriken',
        'kunai'
    ],
    attack
};

function attack() {
    return console.log('Fight...' + this.name);
};

Object.prototype.changeHP = function(hit) {
    // Отнимаем здоровье
    this.hp -= hit;

    // Если здоровье 0 или меньше устанавливаем hp = 0
    if (this.hp <= 0 ) { 
        this.hp = 0;
    };
};

Object.prototype.elHP = function() {
    // Получаем блок здоровья игрока
    const $player = document.querySelector(`.player${this.player} .life`);
    
    return $player;
};

// const elHP = () => document.querySelector(`.player${this.player} .life`);

Object.prototype.renderHP = function() {
    // Отображаем изменение шкалы здоровья
    const $playerLife = this.elHP();

    $playerLife.style.width = `${this.hp}%`;
};

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
export const ATTACK = [
    'head',
    'body',
    'foot'
];

// Функция получает имя победителя и создает блок с именем победителя 
function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = `${name} WINS!`;
    } else {
        // Выводим блок с сообщением о ничьей
        $winTitle.innerText = 'DOUBLE KILL!';
    };

    return $winTitle;
};

function getWinner() {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        // Если игрок 1 проиграл выводим имя 2 игрока и генерируем сообщение в лог
        $arenas.appendChild(playerWin(player2.name));
        generateLogs(getLogMessage('end', player2.name, player1.name));

    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        // Если игрок 2 проиграл выводим имя 1 игрока и генерируем сообщение в лог
        $arenas.appendChild(playerWin(player1.name));
        generateLogs(getLogMessage('end', player1.name, player2.name));

    } else if (player1.hp === 0 && player2.hp === 0) {
        // Если ничья выводим сообшение double kill и генерируем сообщение в лог
        $arenas.appendChild(playerWin());
        generateLogs(getLogMessage('draw'));
    };
};

function createReloadButton() {
    // Создаем кконтейнер и кнопку перезагрузки
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

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

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        // Отлючаем кнопку и выбор действий
        for (let item of $fightForm) {

            if (item.type === 'submit' || item.type === 'radio') {
                item.disabled = true;
            }
        }
        // Выводим победителя
        getWinner();
        // Вызываем фунцию создания кнопки перезагрузки
        createReloadButton();
    }
};


export function enemyAttack() {
    const enemyHit = ATTACK[getRandom(3) - 1];
    const enemyDefence = ATTACK[getRandom(3) - 1];

    return {
        enemyHitValue: getRandom(HIT[enemyHit]),
        enemyHit,
        enemyDefence,
    }
};

export function playerAttack() {
    const attack = {};

    for (let item of $fightForm) {
        if (item.checked && item.name === 'hit') {
            attack.playerHitValue = getRandom(HIT[item.value]);
            attack.playerHit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.playerDefence = item.value;
        }

        item.checked = false;
    };

    return attack;

};