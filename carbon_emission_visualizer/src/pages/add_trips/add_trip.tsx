import React, { useState, type JSX } from 'react';
import type { TripDetails } from '../../types/trip_types';
import { TripForm } from '../../components/trip_form';
import './add_trip.css'


export function AddTripPage(): JSX.Element {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const handleTripSubmit = (data: TripDetails) => {
        // tripsProvider.addTrip(data).subscribe({
        // next: () => setStatusMessage('Trip added successfully!'),
        // error: err => setStatusMessage(`Error: ${err.message}`),
        // });
    };

    return (
        <div className="add-trip-page">
        <h1>Add a New Trip</h1>
            <TripForm onSubmit={handleTripSubmit} />
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};