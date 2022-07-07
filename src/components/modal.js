import { useEffect } from 'react';
import '../styleComponents/modal.css';

const Modal = (props) => {
    
    const review = props.review;
    
    useEffect(()=>{
        document.querySelector('.modal').innerHTML = "";
        for(let i=0;i<review.length;i++){
            document.querySelector('.modal').innerHTML += `<p>${review[i].tourName}</p><img src=${review[i].tourImage} alt="icon"/><p>${review[i].reviewStar}</p><p>${review[i].reviewText}</p>`
        }
    }, [])
    

    return(
        <div className='root-modal'>
            <div className="modal"></div>
        </div>
    )
}
export default Modal;