let slideButtons = document.querySelectorAll('.arrow-container li span');

const slider = () => {
    slideButtons.forEach((li)=> {
        li.addEventListener('click', () => {
    
            const direction = li.id === "prev" ? -1 : 1;
            console.log(direction);
        })

    })
}

window.addEventListener('load',slider);