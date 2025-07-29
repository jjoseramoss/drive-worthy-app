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
        const prompt = `Analyze the following used car listing for quality and value. Provide a concise summary, a simple rating (e.g., "Excellent Deal", "Good Value", "Fair Price", "Proceed with Caution"), and a list of key points a buyer should consider.

        Car Details:
        Make: ${make}
        Model: ${carModel}
        Year: ${year}
        Mileage: ${mileage} miles
        Price: $${price}
        Description: ${description}

        Output should be in a clear, readable format.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.json({
            message: 'Analysis complete!',
            analysis: text
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