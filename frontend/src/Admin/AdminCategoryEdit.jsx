import React, { useEffect, useState } from 'react'
import { CgClose } from "react-icons/cg";
import axios from "axios"
const AdminCategoryEdit = ({onClose,cat,fetchCat}) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const [data,setData] = useState({
    name : cat.name,
    photo:cat.photo,
   
  })
 
 const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value})
 }

 const handleImage = async(e) => {
  const image = e.target.files[0];
  const formData = new FormData();
    formData.append('image', image);
    data.photo= image.name;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
     
    } catch (error) {
      console.error('Error uploading image:', error);
    }
};



 const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    const res= await axios.put(`${import.meta.env.VITE_URL}/api/v1/category/${cat._id}`,data)
    fetchCat();
    if(res.data.success){
      onClose()
      // fetchCat()
    }
  } catch (error) {
    console.log(error);
  }
}



  return (
    
    <div className=' fixed w-full  mt-8 h-[88vh] bg-slate-200 bg-opacity-35 top-auto left-0 right-0 bottom-0 flex justify-center items-center z-20'>
    <div className='bg-white p-2 rounded w-full max-w-2xl h-full overflow-x-hidden  overflow-scroll  '>

    <div className='flex justify-between   items-center mb-0 flex-col relative'>
                <h2 className='font-bold text-lg mb-2'>Edit Category</h2>
                <div className=' absolute top-3 right-3 text-2xl hover:text-red-600 cursor-pointer' onClick={onClose} >
                    <CgClose/>
                </div>


                <form className='flex flex-col w-[30vw]'onSubmit={handleSubmit}  >

                  <label htmlFor="name " className=' font-medium'>Name:</label>
                  <input onChange={handleChange} type="text " value={data.name} name='name' className='outline-none border-2 rounded-md  py-0.5 mt-2 mb-2' />
                  <label htmlFor="photo" className=' font-medium'> Photo:</label>
                  <input onChange={handleImage} type="file" fileName={data.photo} className=' my-2' name ='photo' id="" />
                 {
                  selectedImage ? <div>
                     
                  <img src={selectedImage}  alt="Selected" width={100} height={100} />
                </div>: <img src={`${import.meta.env.VITE_URL}/download/${data.photo}`} width={90} height={90} className='bg-slate-100 border '  alt="" />
                 }
                 
                  

                   <button type='submit' className=' bg-blue-600 text-white mt-2.5 py-1.5 rounded-md w-[40%] hover:bg-blue-900 mx-auto px-3'>Update</button>
                </form>
            </div>
      </div>
      
    </div>
  )
}

export default AdminCategoryEdit