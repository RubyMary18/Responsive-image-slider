let slideButtons = document.querySelectorAll('.arrow-container li span');
let imageList = document.querySelector(".image-list");
let maxScroll = imageList.scrollWidth - imageList.clientWidth;
let sliderScrollbar = document.querySelector('.scrollbar');
let scrollbarThumb = document.querySelector('.scrollbar .scrollbar-thumb');

//slide image according to the slide buttons
const slider = () => {
    slideButtons.forEach((li) => {

        li.addEventListener('click', () => {
            const direction = li.id === "prev" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })


        const slideHandle = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
            slideButtons[1].style.display = imageList.scrollLeft >= maxScroll ? 'none' : 'block';
        }

        //Handle scrollbar thumb drag
        scrollbarThumb.addEventListener('mousedown', (e) => {
            const startX = e.clientX;
            const thumbPos = scrollbarThumb.offsetLeft;


            //update thumb position on mouse move
            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPos + deltaX;

                const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
                
                const boundedPosition = Math.max(0, Math.min((maxThumbPosition), newThumbPosition));
                const scrollPos = (boundedPosition / maxThumbPosition) * maxScroll;

                scrollbarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPos;
            }

            const handleMouseUp = (e) => {
                document.removeEventListener('mousemove', handleMouseMove);
            }

            //Add event listeners for drage interaction
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        })

        //Update scrollbar thumb position based on image scroll
        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScroll) * (scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }

        imageList.addEventListener('scroll', () => {
            slideHandle();
            updateScrollThumbPosition();
        });
    })
}

window.addEventListener('load', slider);