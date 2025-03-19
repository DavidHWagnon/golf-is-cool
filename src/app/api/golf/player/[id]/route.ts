import { NextResponse } from "next/server";

const API_KEY = process.env.SPORTSDATA_API_KEY;
const BASE_URL = 'https://api.sportsdata.io/golf/v2/json';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
    const { id } = await context.params;
    
    if (!id) {
        console.log('API Route - Error: No ID provided');
        return NextResponse.json(
            { error: 'Player ID is required' },
            { status: 400 }
        );
    }
    
    try {
        console.log('API Route - Fetching from:', `${BASE_URL}/Player/${id}`);
        const response = await fetch(`${BASE_URL}/Player/${id}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY || '',
            }
        });

        console.log('API Route - Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Route - Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Route - Successfully fetched data');

        return NextResponse.json(data);

    } catch (error) {
        console.error('API Route - Error details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch player details' },
            { status: 500 }
        );
    }
}