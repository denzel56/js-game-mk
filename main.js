// Подключаем функции и переменные
import { player1, player2, showResult, enemyAttack, playerAttack } from './fight.js';
import {createElement} from './utils.js';
import { generateLogs, getLogMessage } from './fight_logs.js';

export const $arenas = document.querySelector('.arenas');
// const $randButton = document.querySelector('.button');
export const $fightForm = document.querySelector('.control');




function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    
    $life.style.width = `${playerObj.hp}%`;
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    return $player;
};




$fightForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    // Деструтурируем объекты
    const {enemyHitValue, enemyHit, enemyDefence} = enemy;
    const {playerHitValue, playerHit, playerDefence} = player;

    if (playerHit !== enemyDefence) {
        player2.changeHP(playerHitValue);
        player2.renderHP();
        // Получаем сообщение лога и передаем его для вывода
        generateLogs(getLogMessage('hit', player1.name, player2.name), playerHitValue, player2.hp);

    } else {
        generateLogs(getLogMessage('defence', player1.name, player2.name), 0, player2.hp);
    }
    
    if (playerDefence !== enemyHit) {
        player1.changeHP(enemyHitValue);
        player1.renderHP();
        // Получаем сообщение лога и передаем его для вывода
        generateLogs(getLogMessage('hit', player2.name, player1.name), enemyHitValue, player1.hp);

    } else {
        generateLogs(getLogMessage('defence', player2.name, player1.name), 0, player1.hp);
    }
    // Показываем результат
    showResult();

    console.log('###: p', player);
    console.log('###: e', enemy);
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
// Получаем сообщение лога о старте и передаем его для вывода
generateLogs(getLogMessage('start', player1.name, player2.name));

