import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md";

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const {course, editCourse} = useSelector((state)=> state.course)

    const [chips, setChips] = useState([])

    useEffect(()=>{
      if(editCourse){
        setChips(course?.tag)
      }

      register(name, {required: true, validate: (value)=> value.length > 0})
    },[])

    useEffect(()=>{
      setValue(name, chips)
    }, [chips])

    const handleKeyDown = (event)=>{

      if(event.key === "Enter" ||event.key === ","){
        event.preventDefault()

        const chipValue = event.target.value.trim()

        if(chipValue && !chips.includes(chipValue)){
            const newChips = [...chips, chipValue]
            setChips(newChips)
            event.target.value = ""
        }
      }
    }

    const handleDeleteChip = (chipIndex)=>{
        const newChips = chips.filter((_, index)=> index !== chipIndex)
        setChips(newChips)
    }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className='flex flex-wrap gap-y-2 w-full'>
        {chips.map((chip, index) => (
          <div
            key={index}
            className='flex items-center rounded-full bg-yellow-400 text-richblack-5 m-1 px-2 py-1'
          >
            {chip}
            <button
              type='button'
              className='ml-2 focus:outline-none'
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose  className='text-sm'/>
            </button>
          </div>
        ))}

        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='form-style w-full'
        />
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}

export default ChipInput
