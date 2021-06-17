// Подлючаем функции
// import {getTime} from './utils/index.js';
// import getRandom from './utils/index.js';
// import { LOGS } from './constants/index.js';

// const 

// Деструктурируем объект logs. Получаем сообщение для лога
// export function getLogMessage(type, player1, player2) {
//     const {start, end, hit, defence, draw} = LOGS;
    
//     let text;
//     switch(type) {
//         case 'start' :
//             text = start
//                 .replace('[player1]', player1)
//                 .replace('[player2]', player2);
//             return text;
//         case 'hit' :
//             text = hit[getRandom(hit.length) - 1]
//                 .replace('[playerKick]', player1)
//                 .replace('[playerDefence]', player2);
//             return text;
//         case 'defence' :
//             text = defence[getRandom(defence.length) - 1]
//                 .replace('[playerKick]', player1)
//                 .replace('[playerDefence]', player2);
//             return text;
//         case 'end' :
//             text = end[getRandom(end.length) - 1]
//                 .replace('[playerWins]', player1)
//                 .replace('[playerLose]', player2);
//             return text;
//         case 'draw' :
//             text = draw;
//             return text;
//         default :
//             text = '... ждем ...';
//             return text;
//     }
// };

// Генерируем информацию для лога
// export function generateLogs(text, damage, playerHP) {
//     const fightTime = getTime();
//     const message = text.replace('[time]', fightTime);
//     let el;
//     if (damage) {
//         el = `<p>${fightTime} ${message} -${damage} ${playerHP}/100</p>`;
//     } else {
//         el = `<p>${fightTime} ${message}</p>`;
//     }

//     $chat.insertAdjacentHTML('afterbegin', el);
// };