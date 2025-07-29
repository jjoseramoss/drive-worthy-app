import React, { useState } from 'react'
import Header from './components/Header'
import ListingInput from './components/ListingInput'
import ResultsPanel from './components/ResultsPanel'
const App = () => {
  const [listingData, setListingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleListingSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setListingData(data);
    }, "5000");

    console.log('Listing data recieved in App', data);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className='flex justify-center items-start p-8'>
        <ListingInput handleSubmitOut={handleListingSubmit} />    
            
      </main>

      {/**Placeholder for results */}
      {

        isLoading ? (
          //JSX for loading indicator
          <p className='flex justify-center text-2xl font-bold p-4 text-green-950'>Loading...</p>
        ) : listingData ? (
         <ResultsPanel 
          {...listingData} // spread operator !
          /> 
        ) : (
          //welcome message
          <p className='flex justify-center text-2xl font-bold p-4'>Submit a listing to get started!</p>
        )
      }
    </div>
  )
}

export default App