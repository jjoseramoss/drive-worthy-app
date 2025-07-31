// Load environment variables
import dotenv from 'dotenv'
dotenv.config();

// Import modules
import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Configure Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
    console.error('GEMINI_API_KEY not found in .env file.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

// Define a simple test route (GET request)
app.get('/', (req, res) => {
    res.send('DriveWorthy Backend is running!');
});

// Define API endpoint for car analysis (POST request)
app.post('/analyze-car', async (req, res) => {
    try {
        const { make, carModel, year, mileage, price, description } = req.body;
        console.log('Recieved car data: ', { make, carModel, year, mileage, price, description });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
        const prompt = `Analyze the car details. Provide a concise summary, an overall rating from 0-10, an array of "keyPoints" for a buyer to consider, and an array of "potentialIssues". Ensure the output is *ONLY* a JSON object with the following structure:

        {
        "summary": "...",
        "overallRating": [0-10 integer],
        "keyPoints": ["...", "..."],
        "potentialIssues": ["...", "..."],
        "recommendation": "..."
        }

        Car Details:
        Make: ${make}
        Model: ${carModel}
        Year: ${year}
        Mileage: ${mileage} miles
        Price: $${price}
        Description: ${description}

        Do not include any other text, comments, or markdown outside the JSON`;

        const result = await model.generateContent(prompt);

        const response = result.response;
        let text = response.text();

       console.log('Original text from Gemini (before stripping):', text); // For initial debugging
       const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);

       let extractedJsonString = ''; // Initialize a variable to hold the extracted JSON string

       if (jsonMatch && jsonMatch[1]) {
        extractedJsonString = jsonMatch[1].trim(); // Get the content from the capturing group and trim whitespace
        console.log('Successfully extracted JSON from markdown.');
       } else {
            // If the markdown block pattern is not found, assume the text might already be pure JSON
            // or log a warning if it's unexpected.
            console.warn('No ````json` block found. Attempting to parse raw text directly.');
            extractedJsonString = text.trim(); // Use the original text, trimmed
       }

        // Now, 'extractedJsonString' holds what we hope is pure JSON
        console.log('Attempting to parse this string:', extractedJsonString);

        let parsedAnalysis;
        try {
            parsedAnalysis = JSON.parse(extractedJsonString);
            console.log('Successfully parsed Gemini JSON:', parsedAnalysis);
        }catch (error){
            console.error('Failed to parse Gemini JSON. Raw text was:', extractedJsonString); // Log raw text on failure
            console.error('Parsing error:', error);
            // Decide how to handle this gracefully for the frontend, e.g., send a generic error
            return res.status(500).json({ error: 'Failed to parse AI analysis. Invalid JSON format.' });
        }

        res.json({
            message: 'Analysis complete!',
            analysis: parsedAnalysis
        });


    } catch(error) {
        console.error("Error analyzing car: ", error);
        res.status(500).json({ error: 'Failed to analyze car listing.'})
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})