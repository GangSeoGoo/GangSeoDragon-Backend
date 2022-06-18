import axios from "axios";
import { useState } from "react";

function Review(){
    const [review, setReview] = useState("");
    const [reviewStar, setReviewStar] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const postReview = () => {
        if(review === "") {
            alert('관광지명이 없습니다');
        }
        else if(reviewStar === null){
            alert('별점이 없습니다');
        }
        else if(reviewText === ""){
            alert('리뷰 내용이 없습니다.')
        }
        else{
            const reviewData = {
                tourName: review,
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
            <input type="text" onChange={(e)=>{ setReview(e.target.value) }} placeholder="관광지 이름" />
            <input type="number" onChange={(e)=>{ setReviewStar(e.target.value) }} min="1" max="5" />
            <textarea placeholder="여기에 리뷰를 작성해주세요." onChange={(e)=>{ setReviewText(e.target.value) }}/>
            <button onClick={postReview}>클릭</button>
        </div>
    );
}
export default Review;