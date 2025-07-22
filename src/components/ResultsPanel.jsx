import React from 'react'

const ResultsPanel = ({ make, model, year, mileage, description }) => {

  return (
    <div className='max-w-lg mx-auto p-4 mt-8 bg-white rounded shadow'>
        <h3 className='text-xl font-semibold mb-2'>Results:</h3>
        <p><strong>Make:</strong> {make}</p>    
        <p><strong>Model:</strong> {model}</p>    
        <p><strong>Year:</strong> {year}</p>    
        <p><strong>Mileage:</strong> {mileage}</p>    
        <p><strong>Description:</strong> {description}</p>    

    </div>
  )
}

export default ResultsPanel