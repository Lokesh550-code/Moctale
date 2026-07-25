import ReviewCard from "./ReviewCard";
import { useState } from "react";
import SkeletonReviewComponent from "../SkeletonLoadingState/SkeletonReviewComponent";
import EmptyReviewState from "./EmptyReviewState";

const ReviewComponent = ({ reviews, isLoading }) => {
  const [selected, setSelected] = useState(``);
  const [isClicked, setIsClicked] = useState(false);

  if(isLoading) {
    return <SkeletonReviewComponent />
  }

  if(!reviews || reviews.length === 0) {
    return <EmptyReviewState/>
  }

  return (
    <div>
      <div
        className={`${isClicked ? "h-fit" : "h-[70vh]"} overflow-y-hidden py-5 px-10 flex flex-col gap-4`}
      >
        <div className="">
          <h1 className="text-2xl">Reviews</h1>
        </div>
        <div className="flex flex-col gap-3">
          {reviews.map((item) => {
            return (
              <ReviewCard
                item={item}
                key={item.id}
                isSelected={item.id === selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setIsClicked(!isClicked)}
        className={`h-10 flex items-center justify-center mx-10 my-2 cursor-pointer hover:bg-stone-900 ${reviews.length > 2 ? 'block': 'hidden'}`}
      >
        {isClicked ? "Show Less" : "Show more"}
      </div>
    </div>
  );
};

export default ReviewComponent;
