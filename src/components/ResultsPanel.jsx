import React from "react";

const ResultsPanel = ({
  make,
  carModel,
  year,
  mileage,
  price,
  description,
  analysis,
}) => {
  const {
    keyPoints,
    overallRating,
    potentialIssues,
    recommendation,
    summary,
    message,
  } = analysis;

  return (
    <div className="max-w-lg mx-auto p-4 mt-8 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Results:</h3>
      <p>
        <strong>Make:</strong> {make}
      </p>
      <p>
        <strong>Model:</strong> {carModel}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>
        <strong>Mileage:</strong> {mileage}
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      {analysis && ( // only show analysis IF it exists
        <>
          <h4 className="text-lg font-semibold mt-4 mb-2">AI Analysis: </h4>

          <h2 className="text-lg font-bold">Overall Rating: {overallRating}</h2>

          <hr />
          <ul>
            {keyPoints.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>

          <hr />

          <ul>
            {potentialIssues.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
          <hr />
          <p>{summary}</p>
          <hr />
          <p>{recommendation}</p>
          <hr />
          <h2>{message}</h2>
        </>
      )}
    </div>
  );
};

export default ResultsPanel;
