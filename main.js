// Подключаем функции и переменные
import Game from './game/index.js';
// import { player1, player2, showResult, enemyAttack, playerAttack } from './fight.js';
// import {createElement} from './utils/index.js';
// import { generateLogs, getLogMessage } from './fight_logs.js';

// const $randButton = document.querySelector('.button');
// export const $arenas = document.querySelector('.arenas');
// export const $fightForm = document.querySelector('.control');

// $fightForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const {enemyHitValue, enemyHit, enemyDefence} = enemyAttack();
//     const {playerHitValue, playerHit, playerDefence} = playerAttack();

//     // // Деструтурируем объекты
//     // const  = enemy;
//     // const  = player;

//     if (playerHit !== enemyDefence) {
//         player2.changeHP(playerHitValue);
//         player2.renderHP();
//         // Получаем сообщение лога и передаем его для вывода
//         generateLogs(getLogMessage('hit', player1.name, player2.name), playerHitValue, player2.hp);

//     } else {
//         generateLogs(getLogMessage('defence', player1.name, player2.name), 0, player2.hp);
//     }
    
//     if (playerDefence !== enemyHit) {
//         player1.changeHP(enemyHitValue);
//         player1.renderHP();
//         // Получаем сообщение лога и передаем его для вывода
//         generateLogs(getLogMessage('hit', player2.name, player1.name), enemyHitValue, player1.hp);

//     } else {
//         generateLogs(getLogMessage('defence', player2.name, player1.name), 0, player1.hp);
//     }
//     // Показываем результат
//     showResult();

//     // console.log('###: p', playerAttack());
//     // console.log('###: e', enemyAttack());
// });


const game = new Game();
game.start();