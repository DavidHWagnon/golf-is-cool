import { NextResponse } from "next/server";

const API_KEY = process.env.SPORTSDATA_API_KEY;
const BASE_URL = 'https://api.sportsdata.io/golf/v2/json';

export async function GET(
    request: Request,
    context: { params: { year: string } }
) {
    const { year } = await context.params;
    console.log('Fetching rankings for year:', year);
    
    try {
        const response = await fetch(`${BASE_URL}/Rankings/${year}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY || '',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching golf rankings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch golf rankings' },
            { status: 500 }
        );
    }
} 