import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {apiConnector} from "../services/apiconnector.js"
import {categories} from "../services/apis.js"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error.jsx"
import CourseCard from '../components/core/Catalog/CourseCard.jsx'
import CourseSlider from '../components/core/Catalog/CourseSlider.jsx'
import Footer from '../components/comman/Footer.jsx'

const Catelog = () => {

    const {loading} = useSelector((state) => state.profile)
    const {catalogName} = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [active, setActive] = useState(1)

    useEffect(() => {
        const getCategories = async() => {
            const response = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("getCategories response:", response);
            console.log("catelog name: ", catalogName);
            
            const category_id = response?.data?.data?.filter(
              (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            console.log("category_id",category_id);
            setCategoryId(category_id)
        }

        getCategories()
    },[catalogName])

    useEffect(() => {
      const getCategoryDetails = async () => {
        try {
          const response = await getCatalogaPageData(categoryId)
          console.log("getCatalogaPageData", response);
          setCatalogPageData(response)
          
        } catch (error) {
          console.log(error);
        }
      }

      if(categoryId){
        getCategoryDetails()
      }
    },[categoryId])

    if (loading || !catalogPageData) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      );
    }
    if (!loading && !catalogPageData.success) {
      return <Error />;
    }


  return (
    <div>
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div className="lg:max-w-maxContent max-w-maxContentTab w-full box-content mx-auto px-4 py-12">
        <div className="section_heading">Courses to get you started</div>
        <div className="flex border-b border-b-richblack-600 text-sm my-4">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>

        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catelog
