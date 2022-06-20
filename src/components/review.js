import axios from "axios";
import { useState, useEffect } from "react";

function Review(){
    const [reviewStar, setReviewStar] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [tourlist, setTourlist] = useState(null);
    const [selected, setSelected] = useState(null);
    const selEl = document.querySelector('select');

    useEffect(() => {
        axios.get('api/tourlist')
            .then(response => {
                return response
            }).then(data => {
                setTourlist(data.data);
            })
    }, [])

    setTimeout(()=>{
        for(let i=0;i<tourlist.length;i++){
            selEl.innerHTML += `<option value=${tourlist[i].tourNum}>${tourlist[i].tourName}</option>`
        }
    }, 100)

    const postReview = () => {
        if(selected === "null"){
            alert('관광지를 선택해주세요.')
        }
        else if(reviewStar === null){
            alert('별점을 선택해주세요.');
        }
        else if(reviewText === ""){
            alert('리뷰 내용을 적어주세요.')
        }
        else{
            const reviewData = {
                tourNum: selected,
                reviewStar: reviewStar,
                reviewText: reviewText
            }
            axios.post('/api/postReview', reviewData)
            .then((response)=>{
                return response;
            }).then(data => {
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <div>
            <h1>리뷰 작성</h1>
            <select onChange={(e)=>{ setSelected(e.target.value) }}>
                <option value={"null"}>관광지 선택</option>
            </select>
            <input type="number" onChange={(e)=>{ setReviewStar(e.target.value) }} min="1" max="5" />
            <textarea placeholder="여기에 리뷰를 작성해주세요." onChange={(e)=>{ setReviewText(e.target.value) }}/>
            <button onClick={postReview}>클릭</button>
        </div>
    );
}
export default Review;