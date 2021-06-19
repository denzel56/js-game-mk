import getRandom from '../utils/index.js';
import {getTime, createElement} from '../utils/index.js';
import { ATTACK, HIT, LOGS } from '../constants/index.js';
import Player from '../player/index.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $fightForm = document.querySelector('.control');

class Game {

    constructor() {
        this.player1 = new Player({
            player: 1,
            name: 'SUBZERO',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
            rootSelector: 'arenas'
        });

        this.player2 = new Player({
            player: 2,
            name: 'LIU KANG',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
            rootSelector: 'arenas'
        });
        
    }

    playerWin = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        if (name) {
            $winTitle.innerText = `${name} WINS!`;
        } else {
            // Выводим блок с сообщением о ничьей
            $winTitle.innerText = 'DOUBLE KILL!';
        };
    
        return $winTitle;
    };

    getWinner = () => {
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            // Если игрок 1 проиграл выводим имя 2 игрока и генерируем сообщение в лог
            $arenas.appendChild(this.playerWin(this.player2.name));
            this.generateLogs(this.getLogMessage('end', this.player2.name, this.player1.name));
    
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            // Если игрок 2 проиграл выводим имя 1 игрока и генерируем сообщение в лог
            $arenas.appendChild(this.playerWin(this.player1.name));
            this.generateLogs(this.getLogMessage('end', this.player1.name, this.player2.name));
    
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            // Если ничья выводим сообшение double kill и генерируем сообщение в лог
            $arenas.appendChild(this.playerWin());
            this.generateLogs(this.getLogMessage('draw'));
        };
    };

    createReloadButton = () => {
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

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            // Отлючаем кнопку и выбор действий
            for (let item of $fightForm) {
    
                if (item.type === 'submit' || item.type === 'radio') {
                    item.disabled = true;
                }
            }
            // Выводим победителя
            this.getWinner();
            // Вызываем фунцию создания кнопки перезагрузки
            this.createReloadButton();
        }
    };

    enemyAttack = () => {
        const enemyHit = ATTACK[getRandom(3) - 1];
        const enemyDefence = ATTACK[getRandom(3) - 1];
    
        return {
            enemyHitValue: getRandom(HIT[enemyHit]),
            enemyHit,
            enemyDefence,
        }
    };

    playerAttack = () => {
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

    getLogMessage = (type, player1, player2) => {
        
        let text;
        switch(type) {
            case 'start' :
                text = LOGS[type]
                    .replace('[player1]', player1)
                    .replace('[player2]', player2);
                return text;
            case 'hit' :
                text = LOGS[type][getRandom(LOGS[type].length) - 1]
                    .replace('[playerKick]', player1)
                    .replace('[playerDefence]', player2);
                return text;
            case 'defence' :
                text = LOGS[type][getRandom(LOGS[type].length) - 1]
                    .replace('[playerKick]', player1)
                    .replace('[playerDefence]', player2);
                return text;
            case 'end' :
                text = LOGS[type][getRandom(LOGS[type].length) - 1]
                    .replace('[playerWins]', player1)
                    .replace('[playerLose]', player2);
                return text;
            case 'draw' :
                text = LOGS[type];
                return text;
            default :
                text = '... ждем ...';
                return text;
        }
    };

    generateLogs = (text, damage, playerHP) => {
        const fightTime = getTime();
        const message = text.replace('[time]', fightTime);
        let el;
        if (damage) {
            el = `<p>${fightTime} ${message} -${damage} ${playerHP}/100</p>`;
        } else {
            el = `<p>${fightTime} ${message}</p>`;
        }
    
        $chat.insertAdjacentHTML('afterbegin', el);
    };
    
    fightFomListenner = () => {
        $fightForm.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const {enemyHitValue, enemyHit, enemyDefence} = this.enemyAttack();
            const {playerHitValue, playerHit, playerDefence} = this.playerAttack();
        
    
            if (playerHit !== enemyDefence) {
                this.player2.changeHP(playerHitValue);
                this.player2.renderHP();
                // Получаем сообщение лога и передаем его для вывода
                this.generateLogs(this.getLogMessage('hit', this.player1.name, this.player2.name), playerHitValue, this.player2.hp);
    
            } else {
                this.generateLogs(this.getLogMessage('defence', this.player1.name, this.player2.name), 0, this.player2.hp);
            }
            
            if (playerDefence !== enemyHit) {
                this.player1.changeHP(enemyHitValue);
                this.player1.renderHP();
                // Получаем сообщение лога и передаем его для вывода
                this.generateLogs(this.getLogMessage('hit', this.player2.name, this.player1.name), enemyHitValue, this.player1.hp);
    
            } else {
                this.generateLogs(this.getLogMessage('defence', this.player2.name, this.player1.name), 0, this.player1.hp);
            }
            // Показываем результат
            this.showResult();
    
            console.log('###: p', playerHitValue, playerHit, playerDefence);
            console.log('###: e', enemyHitValue, enemyHit, enemyDefence);
        });
    }
    
        

    start = () => {
        // console.log(this.player1);
        this.player1.createPlayer();
        this.player2.createPlayer();

        this.fightFomListenner();
        this.generateLogs(this.getLogMessage('start', this.player1.name, this.player2.name));    
    }
};



export default Game;