import { NextResponse } from 'next/server'

interface TrackingResponse {
  ret: number
  msg: string | null
  data: {
    accepted: {
      number: string
      track: {
        z0: {
          a: string // Status
          c: string // Location
          d: string // Time
          z: string // Description
        }[]
      }
    }[]
  }[]
}

export async function GET(
  request: Request,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    const trackingNumber = params.trackingNumber
    
    // Make request to 17track API
    const response = await fetch('https://api.17track.net/track/v2/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '17token': process.env.TRACKING_API_KEY || '',
      },
      body: JSON.stringify({
        numbers: [trackingNumber],
        // Optional carrier code, can be added if known
        // carriers: [carrier code],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: TrackingResponse = await response.json()

    // Check if we got valid tracking data
    if (data.ret !== 1 || !data.data?.[0]?.accepted?.[0]?.track?.z0?.[0]) {
      return NextResponse.json({
        status: 'Pending',
        location: 'Waiting for carrier update',
        timestamp: new Date().toISOString(),
        description: 'Tracking information will be available once the carrier processes the shipment',
      })
    }

    // Get the latest tracking event
    const latestEvent = data.data[0].accepted[0].track.z0[0]

    // Format the tracking data
    const trackingInfo = {
      status: latestEvent.a || 'In Transit',
      location: latestEvent.c || 'Processing',
      timestamp: latestEvent.d || new Date().toISOString(),
      description: latestEvent.z || 'Package is being processed',
    }

    return NextResponse.json(trackingInfo)
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch tracking information',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

