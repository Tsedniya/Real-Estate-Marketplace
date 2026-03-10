import React from 'react'

const CreateListing = () => {


  return (
    <main className="p-3 max-w-4xl mx-auto">

        <h1 className='md:text-5xl text-3xl font-semibold text-center my-7 py-5'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-12'>
            <div className='flex flex-col gap-4 flex-1'>

                <input type="text" placeholder='Name' className='border p-3 rounded-lg  border-black' id='name' maxLength='62' minLength='10' required/> 

                <textarea type="text" placeholder='Description' className='border p-3  rounded-lg border-black' id='description' required/> 

                <input type="text" placeholder='Address' className='border p-3 rounded-lg border-black' id='address'  required/> 
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5 border-black'/>
                        <span className='text-xl'>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5 border-black'/>
                        <span className='text-xl'>Rent</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5 border-black '/>
                        <span className='text-xl'>Parking</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5 border-black '/>
                        <span className='text-xl'>Furnished</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5 border-black '/>
                        <span className='text-xl'>Offer</span>

                    </div>

                </div>
            
            <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                    <input type="number" id='bedrooms' min='1' max='10' className='border p-3 border-black rounded-lg' required/>
                    <p className='text-xl'>Beds</p>
                </div>

                <div className='flex items-center gap-2'>

                    <input type="number" id='baths' min='1' max='10' className='border p-3 border-black rounded-lg' required/>
                    <p className='text-xl'>Baths</p>
               
                </div>

                <div className='flex items-center gap-2'>
                  
                    <input type="number" id='regularprice' min='1' max='10' className='border p-3 border-black rounded-lg' required/>
                 
                 <div className='flex flex-col items-center'>
                    <p className='text-xl'>Regular Price</p>
                    <span className='text-xs '>($ / month)</span>
                </div>
                </div>

                <div className='flex items-center gap-2'>
                    <input type="number" id='discountprice' min='1' max='10' className='border p-3 border-black rounded-lg' required/>
                  
                  <div className='flex flex-col items-center'>
                    <p className='text-xl'>Discount Price</p>
                    <span className='text-xs '>($ / month)</span>
                  </div>
                </div>
            </div>
            
            
            </div>

            {/*right part*/}
            <div className='flex flex-col flex-1'>
               <p className='font-semibold text-lg'>Images:
                <span className='font-normal ml-2'>The first image will be the cover (max 6)</span>
               </p>

               <div className='flex gap-4 mb-4 mt-3'>
                 <input className='p-3 border border-black rounded w-full' type="file" id='images' accept='image/*' multiple/>
                 <button className="p-3 bg-[#022222] text-white rounded-lg uppercase hover:opacity-87">Upload</button>
               </div>
               
                <button className='p-3 bg-[#022222] text-white rounded-lg uppercase hover:opacity-87'>Create Listing</button>
        
            </div>
           
        </form>
  
    
    
    
    
    
    
    
    </main>

)}

export default CreateListing