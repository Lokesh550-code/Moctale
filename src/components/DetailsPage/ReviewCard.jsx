const ReviewCard = ({ item, setSelected, isSelected }) => {
    const isLong = item.content.split(' ').length > 60;
    // console.log(isLong);
    // console.log(item.content.split(' ').length)
  return (
    <div className="w-[85%] bg-stone-800 transition cursor-pointer rounded-md overflow-hidden">
      <div className={`${isSelected? "h-fit": "h-24"} w-full flex flex-col gap-3 p-2 overflow-hidden`}>
        <div>
          <h1>Author: {item.author}</h1>
        </div>
        <div>{item.content}</div>
      </div>
        <div onClick={() => setSelected(isSelected? "" : item.id)} className={`${isLong? 'block': 'hidden'} cursor-pointer hover:bg-stone-700 mx-2 my-1 rounded-sm transition h-10 w-full flex items-center justify-center`}>{isSelected? "Show less": "Show More"}</div>
    </div>
  );
};

export default ReviewCard;
