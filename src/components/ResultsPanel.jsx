import React from 'react'

const ResultsPanel = ({ data }) => {

  return (
    <div className='max-w-lg mx-auto p-4 mt-8 bg-white rounded shadow'>
        <h3 className='text-xl font-semibold mb-2'>Results:</h3>
        <pre className='whitespace-pre-wrap'>{JSON.stringify(data, null, 2)}</pre>
        <div className='w-20 h-20 rounded-full flex justify-center items-center bg-green-400 '>Good</div>
    </div>
  )
}

export default ResultsPanel