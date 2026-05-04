import React from "react"

import { HiUsers } from "react-icons/hi"
import { ImTree } from "react-icons/im"

const CourseCard = ({cardData, currentCard, setCurrentCard})=>{
    return (
      <div
        className={`w-[360px] lg:[30%] ${
          currentCard === cardData?.heading
            ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
            : "bg-richblack-800"
        } text-richblack-25 h-[300px] box-border cursor-pointer transition-all duration-200`}
        onClick={() => setCurrentCard(cardData?.heading)}
      >
        <div className="h-[80%] flex flex-col gap-3 p-6 border-b-[2px] border-richblack-400 border-dashed">
          <div
            className={`font-semibold text-[20px] ${
              currentCard === cardData?.heading && "text-richblack-800"
            }`}
          >
            {cardData?.heading}
          </div>
          <div className="text-richblack-400">{cardData?.description}</div>
        </div>

        <div
          className={`flex justify-between ${
            currentCard === cardData?.heading
              ? "text-blue-300"
              : "text-richblack-300"
          } px-6 py-3 font-medium`}
        >
          <div className="flex items-center gap-2 text-[16px]">
            <HiUsers />
            <p>{cardData?.level}</p>
          </div>
          <div className="flex items-center gap-2 text-[16px]">
            <ImTree />
            <p>{cardData?.lessionNumber} Lession</p>
          </div>
        </div>
      </div>
    );
}

export default CourseCard