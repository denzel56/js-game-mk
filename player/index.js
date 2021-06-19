import { createElement } from '../utils/index.js';

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

   changeHP = (hit) => {
        // Отнимаем здоровье
        this.hp -= hit;
    
        // Если здоровье 0 или меньше устанавливаем hp = 0
        if (this.hp <= 0 ) { 
            this.hp = 0;
        };
    };
    
    elHP = () => {
        // Получаем блок здоровья игрока
        const $player = document.querySelector(`.${this.selector} .life`);
        
        return $player;
    };
    
    
    renderHP = () => {
        // Отображаем изменение шкалы здоровья
        const $playerLife = this.elHP();
    
        $playerLife.style.width = `${this.hp}%`;
    };

    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character');
        const $img = createElement('img');
        
        $life.style.width = `${this.hp}%`;
        $name.innerText = this.name;
        $img.src = this.img;
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
    
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
    
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
        
        return $player;
    };
}

export default Player;