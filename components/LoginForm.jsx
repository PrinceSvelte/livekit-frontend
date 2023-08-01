"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'

const LoginForm=()=>{
    // const [name,setName] = useState("")
    const router = useRouter()
    const [user,setuser] = useState({
        name:"",
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        // setName(value)
        setuser(()=> ({
            ...user,
            [name]:value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("name",user?.name)
        router.push("/call")
    }
	return(
		<div>
	    <div className='flex border-b font-bold border-black lg:p-5 mac:p-3 tabview:py-[6px] tabview:px-[8px]'>
        {/* <Image className='text-black lg:w-[20px] tabview:w-[15px]' alt="icon" height={20} width={20} /> */}
        <input autoComplete='off' required={true}  onChange={(e) => handleChange(e)} value={user.name} className='p-1 mx-1 text-black focus:outline-none tabview:text-sm w-[30%]' placeholder="Enter your name" type="text" name="name"  />  
        <button 
    type="button"
    className={`custom-btn cursor-pointer`}
    onClick={handleSubmit}
    >
   {/* <span className={`flex-1`}> */}
  Submit
   {/* </span> */}
    </button>
    </div>
		</div>
	)
}

export default LoginForm    