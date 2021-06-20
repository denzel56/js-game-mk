import getRandom from '../utils/index.js';
import { getTime, createElement } from '../utils/index.js';
import { ATTACK, HIT, LOGS } from '../constants/index.js';
import Player from '../player/index.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $fightForm = document.querySelector('.control');

let player1;
let player2;

class Game {

    getEnemy = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

        return body;
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
        if (player1.hp === 0 && player1.hp < player2.hp) {
            // Если игрок 1 проиграл выводим имя 2 игрока и генерируем сообщение в лог
            $arenas.appendChild(this.playerWin(player2.name));
            this.generateLogs(this.getLogMessage('end', player2.name, player1.name));
    
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            // Если игрок 2 проиграл выводим имя 1 игрока и генерируем сообщение в лог
            $arenas.appendChild(this.playerWin(player1.name));
            this.generateLogs(this.getLogMessage('end', player1.name, player2.name));
    
        } else if (player1.hp === 0 && player2.hp === 0) {
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
            window.location.pathname = 'index.html';
        });
    };

    showResult = () => {
        if (player1.hp === 0 || player2.hp === 0) {
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

    // enemyAttack = () => {
    //     const enemyHit = ATTACK[getRandom(3) - 1];
    //     const enemyDefence = ATTACK[getRandom(3) - 1];
    
    //     return {
    //         enemyHitValue: getRandom(HIT[enemyHit]),
    //         enemyHit,
    //         enemyDefence,
    //     }
    // };

    playerAttack = () => {
        const attack = {};
        
        for (let item of $fightForm) {
            if (item.checked && item.name === 'hit') {
                // attack.playerHitValue = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
    
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
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

    attack = async (hit, defence) => {
        const playersTactic = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit,
                    defence,
                })
            }).then(res => res.json());

        return playersTactic;
    }
    
    fightFomListenner = () => {
        $fightForm.addEventListener('submit', async (event) => {
            event.preventDefault();
        
            const {hit, defence} = this.playerAttack();
            const playersTactic = await this.attack(hit, defence);
            
            const {value: playerHitValue, hit: playerHit, defence: playerDefence} = playersTactic.player1;
            const {value: enemyHitValue, hit: enemyHit, defence: enemyDefence} = playersTactic.player2
            
            console.log(this.playerAttack());
    
            if (playerHit !== enemyDefence) {
                player2.changeHP(playerHitValue);
                player2.renderHP();
                // Получаем сообщение лога и передаем его для вывода
                this.generateLogs(this.getLogMessage('hit', player1.name, player2.name), playerHitValue, player2.hp);
    
            } else {
                this.generateLogs(this.getLogMessage('defence', player1.name, player2.name), 0, player2.hp);
            }
            
            if (playerDefence !== enemyHit) {
                player1.changeHP(enemyHitValue);
                player1.renderHP();
                // Получаем сообщение лога и передаем его для вывода
                this.generateLogs(this.getLogMessage('hit', player2.name, player1.name), enemyHitValue, player1.hp);
    
            } else {
                this.generateLogs(this.getLogMessage('defence', player2.name, player1.name), 0, player1.hp);
            }
            // Показываем результат
            this.showResult();
    
            console.log('###: p', playerHitValue, playerHit, playerDefence);
            console.log('###: e', enemyHitValue, enemyHit, enemyDefence);
        });
    }
    
        

    start = async () => {
        const enemy = await this.getEnemy();
        const p1 = await JSON.parse(localStorage.getItem('player1'))
        const p2 = enemy;

        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas'
        });

        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas'
        });

        player1.createPlayer();
        player2.createPlayer();


        this.fightFomListenner();
        this.generateLogs(this.getLogMessage('start', player1.name, player2.name));    
    };
};



export default Game;