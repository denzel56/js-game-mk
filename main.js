const player1 = {
    name: 'SUBZERO',
    hp: 90,
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
    name: 'LIUKANG',
    hp: 30,
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

function createPlayer(player, fighter) {
    //Создаем div и добавдяем к нему класс player1(2)
    const $player = document.createElement('div');
    $player.classList.add(player);

    //Создаем div и добавдяем к нему класс progressbar
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar')

    
    //Создаем div и добавдяем к нему класс life. Добавляем css-свойство width равное hp игрока
    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = fighter.hp + '%';

    //Создаем div и добавдяем к нему класс name. Кладем имя игрока в блок div
    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = fighter.name;

    //Создаем div и добавдяем к нему класс character
    const $character = document.createElement('div');
    $character.classList.add('character');

    //Создаем div и создаем внутри него изображение
    const $img = document.createElement('img');
    $img.src = fighter.img;

    //Помещаем блоки div.progressbar и div.character в блок div.player1(2)
    $player.appendChild($progressbar);
    $player.appendChild($character);

    //Помещаем блоки div.life и div.name в блок div.progressbar
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    //Помещаем блоки изображение игрока в блок div.character
    $character.appendChild($img);

    //Помещаем div.player1(2) в блок div.arenas
    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
};


//Вызываем функцию создания игрока
createPlayer('player1', player1);
createPlayer('player2', player2);
