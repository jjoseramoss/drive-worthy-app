import React, { useState } from 'react'
import Header from './components/Header'
import ListingInput from './components/ListingInput'
import ResultsPanel from './components/ResultsPanel'
const App = () => {
  const [listingData, setListingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleListingSubmit = async (data) => {
    setIsLoading(true);
    
    const BACKEND_URL = 'http://localhost:3001/analyze-car';

    try {
      //fetch call
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      //process response
      if (!response.ok){
        //if response status is not 2xx, throw error
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch analysis from backend');
      }
      
      const result = await response.json();
      console.log('Backend response: ', result);

      //update listingData state with original data and new analysis

      setListingData({...data, analysis: result.analysis}); 
      setIsLoading(false); //stop loading 

    }catch (error){
      console.error('Error submitting listing: ', error);
      setIsLoading(false);
      setListingData(null);
    }


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