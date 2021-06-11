const $arenas = document.querySelector('.arenas');
// const $randButton = document.querySelector('.button');
const $fightForm = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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
    attack
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

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function attack() {
    return console.log('Fight...' + this.name);
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

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

function getRandom(num) {
    // Получаем силу удара
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
    const $player = document.querySelector(`.player${this.player} .life`);
    
    return $player;
};

function renderHP() {
    // Отображаем изменение шкалы здоровья
    const $playerLife = this.elHP();

    $playerLife.style.width = `${this.hp}%`;
};

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
        // Если игрок 1 проиграл выводим имя 2 игрока
        $arenas.appendChild(playerWin(player2.name));
        generateLogs('end', player2.name, player1.name);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        // Если игрок 2 проиграл выводим имя 1 игрока
        $arenas.appendChild(playerWin(player1.name));
        generateLogs('end', player1.name, player2.name);
    } else if (player1.hp === 0 && player2.hp === 0) {
        // Если ничья выводим сообшение double kill
        $arenas.appendChild(playerWin());
        generateLogs('draw');
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

function showResult() {
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


function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
};

function playerAttack() {
    const attack = {};

    for (let item of $fightForm) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    };

    return attack;

};

function generateLogs(type, player1, player2) {
    const time = new Date();
    const fightTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    let text;
    switch(type) {
        case 'start' :
            // console.log(fightTime);
            text = logs[type].replace('[time]', fightTime).replace('[player1]', player1).replace('[player2]', player2);
            break;
        case 'hit' :
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1).replace('[playerDefence]', player2);
            break;
        case 'defence' :
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1).replace('[playerDefence]', player2);
            break;
        case 'end' :
            text = logs[type][getRandom(logs[type].length) - 1].replace('[playerWins]', player1).replace('[playerLose]', player2);
            break;
        case 'draw' :
            text = logs[type];
            break;
        default :
            text = '... ждем ...';
            break;
    }
    const el = `<p>${fightTime} ${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

$fightForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1.name, player2.name);
    } 
    
    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('defence', player2.name, player1.name);
    }

    showResult();

    console.log('###: p', player);
    console.log('###: e', enemy);
});
//Вызываем функцию создания игрока
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

// generateLogs('start', player1.name, player2.name);
generateLogs();

