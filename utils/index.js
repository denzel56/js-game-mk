const getRandom = (num) => Math.ceil(Math.random() * num);

export default getRandom;

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};


export const getTime = () => {
    const time = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    const fightTime = `${normalize(time.getHours())}:${normalize(time.getMinutes())}:${normalize(time.getSeconds())}`;
    
    return fightTime;
};