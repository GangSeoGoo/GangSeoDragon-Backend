import { useEffect } from 'react';
import '../styleComponents/modal.css';

const Modal = (props) => {
    
    const review = props.review;
    console.log(review);
    
    useEffect(()=>{
        document.querySelector('.modal').innerHTML = "";
        document.querySelector('.modal').innerHTML = `<p>${review[0].tourName}</p><img src=${review[0].tourImage} alt="icon"/>`;
        for(let i=0;i<review.length;i++){
            document.querySelector('.modal').innerHTML += `<p>${review[i].reviewStar}</p><p>${review[i].reviewText}</p>`
        }
    }, [review]);
    

    return(
        <div className='root-modal'>
            <div className="modal"></div>
        </div>
    )
}
export default Modal;