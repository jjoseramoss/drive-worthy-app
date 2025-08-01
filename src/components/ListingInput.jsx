import React, { useState } from 'react'

const ListingInput = ( {handleSubmitOut} ) => {
  const [make, setMake] = useState('');
  const [carModel, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { make, carModel, year, mileage, price, description }

    // clear the form
    setMake('');
    setModel('');
    setYear('');
    setMileage('');
    setPrice('');
    setDescription('');

    // Pass data to parent
    handleSubmitOut(data);
  }

  return (
    <div className='bg-green-200 p-6 rounded-2xl mt-10 w-full max-w-lg'>
        <h2 className='text-2xl mb-4'>Input your FB Listing</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>


            <div>
                <label className='block font-semibold mb-1' htmlFor="make">Car Make</label>
                <input 
                id='make'
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                placeholder='e.g. Ford'
                required/>
            </div>

            <div>
                <label className='block font-semibold mb-1' htmlFor="model">Car Model</label>
                <input 
                id='model'
                type="text"
                value={carModel}
                onChange={(e) => setModel(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                placeholder='e.g. Ranger'
                required/>
            </div>

            <div>
                <label className='block font-semibold mb-1' htmlFor="year">Year</label>
                <input 
                id='year'
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                placeholder='e.g. 2011'
                required/>
            </div>

            <div>
                <label className='block font-semibold mb-1' htmlFor="mileage">Mileage</label>
                <input 
                id='mileage'
                type="number"
                min='0'
                value={mileage}
                onChange={(e) => setMileage(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                placeholder='e.g. 120000'
                required/>
            </div>

            <div>
                <label className='block font-semibold mb-1' htmlFor="price">Price</label>
                <input 
                id='price'
                type="number"
                min='0'
                value={price}
                onChange={(e) => setPrice(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                placeholder='Enter the listing price of the vehicle here...'
                required/>
            </div>

            <div>
                <label className='block font-semibold mb-1' htmlFor="description">Description</label>
                <textarea 
                id='description'
                type='textarea'
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                className='w-full p-2 rounded border border-gray-300'
                rows={5}
                placeholder='Paste the full description from Facebook Marketplace here...'
                required>
                {description}</textarea>
            </div>

            <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            >
                Analyze Listing
            </button>

            
        </form>

        
    </div>
)
}

export default ListingInput