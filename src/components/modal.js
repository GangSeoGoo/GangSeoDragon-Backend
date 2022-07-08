import { useEffect } from 'react';
import '../styleComponents/modal.css';

const Modal = (props) => {
    
    const review = props.review;

    useEffect(()=>{
        const init = () => {
            document.querySelector('.modal').innerHTML = "";
        }
        init();
        document.querySelector('.modal').innerHTML += `<button class='modal-exit'><span>X</span></button>`;
        for(let i=0;i<review.length;i++){
            let star = '★'.repeat(review[i].reviewStar);
            star += '☆'.repeat(5-review[i].reviewStar);
            document.querySelector('.modal').innerHTML += `<div class='modal--review--div'><p class='modal--review--text'>${review[i].reviewText}</p><p><span class='modal--review--star'>${star} </span>${review[i].reviewStar}</p></div>`
        }
        const modalel = document.querySelector('.modal-exit');
        modalel.addEventListener("click", function(){props.close()});
    }, [])
    

    return(
        <div className='root-modal'>
            <div className="modal">
            </div>
        </div>
    )
}
export default Modal;