import React, { useState } from 'react'
import HighlightText from "../../core/HomePage/HighlightText"
import {HomePageExplore} from "../../../data/homepage-explore"
import CourseCard from './CourseCard'

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourse] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

  const setMyCards = (tab)=>{

    setCurrentTab(tab)
    const result = HomePageExplore.filter((course)=> course.tag === tab)
    console.log(result);
    
    setCourse(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
    console.log(currentTab);
    console.log(courses);
    console.log(currentCard);
    
    
    
  }
  return (
    <div>
      {/* explore more section */}
      <div>
        <div className="text-4xl font-semibold text-center my-12">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-2">
            Learn to Bulid Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* tabs section */}
      <div className="hidden lg:flex gap-5 -mt-1 mb-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, i) => {
          return (
            <div
              key={i}
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } 
                px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px] "></div>

      {/* cards group section */}
      <div className="w-full lg:absolute flex flex-wrap lg:gap-0 gap-10 lg:justify-between justify-center lg:buttom-[0] lg:left-[50%] lg:translate-x-[-50%] translate-y-[-50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, i) => {
          return (
            <CourseCard
              key={i}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>

      {/* ctabuttons */}
    </div>
  );
}



export default ExploreMore
