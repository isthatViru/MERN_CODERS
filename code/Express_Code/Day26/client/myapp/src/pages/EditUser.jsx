import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const EditUser = () => {
    const nav=useNavigate()
    const {id}=useParams()
    
      const [data, setData] = useState({
        userName: "",
        email: "",
        password: ""
      });
   
      const getUser=async()=>{
        try {
          const result=  await axios.get(`http://127.0.0.1:3000/oneUser/${id}`)
          
          console.log(result.data.data)
          setData(result.data.data)
        } catch (error) {
            console.log(error)
        }
      }



  useEffect(() => {
  getUser()
}, [])


const dataHandler=(e)=>{
      setData({
         ...data,
         [e.target.name]:e.target.value
      })
}
const saveForm=async(e)=>{
e.preventDefault()
try {
   await  axios.put(`http://127.0.0.1:3000/update/${id}`,data)
       alert("Updated Sucessfully!!")
  
        nav("/");
      setData({
         userName: "",
    email: "",
    password: ""
      })
} catch (error) {
    console.log(error)
}
}
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
     Update User
        </h2>

        <form onSubmit={saveForm}>
          <div className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={data.userName}
                onChange={dataHandler}
                placeholder="Enter username"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={dataHandler}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={dataHandler}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
             Update
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser