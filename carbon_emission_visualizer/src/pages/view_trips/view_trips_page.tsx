import { useEffect, useState, type JSX } from 'react';
import './view_trips.css'
import { tripsProvider } from '../../services/trip_services';
import type { TripLog } from '../../types/trip_types';
import { TripEmissionChart } from '../../components/trips_chart';
import { TripsTable } from '../../components/trips_table';

type PageState = "loading" | "error" | "fetched";
type viewOptions = "table" | "chart";

function switchViews(view: viewOptions, data: TripLog[]): JSX.Element {
    return view === "chart" ? <TripEmissionChart tripLogs={data}/> : <TripsTable tripLogs={data} />;
}

export function ViewTripPage(): JSX.Element {
    const [pageState, setPageState] = useState<PageState>("loading")
    const [data, setData] = useState<TripLog[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [view, setView] = useState<viewOptions>("chart");

    useEffect(() => {
        const fetchTrips: () => void = async () => {
            try {
                const tripLogs = await tripsProvider.fetchTrips();
                const logs =  tripLogs.data;
                setData(logs);
                setPageState("fetched")
            } catch (error) {
                setError(error);
                setPageState("error");
            }
        };

        fetchTrips();
    },[]);

    const visualization: JSX.Element = (() => {
        switch (pageState) {
        case 'loading':
            return <h1> Loading </h1>
        case 'error':
            return <h1> error.message </h1>
        case 'fetched':
            return data !== null ? switchViews(view, data) : <></>;
        default:
            return <h1> Unexpected Error {error?.message} </h1>
    }})();


    return(<div className="view-trip-page">
        <div className="header">Your Carbon emissions </div>
        <div className="button-container">
            <button className="button" onClick={
                () => setView(view === "chart" ? "table" : "chart")
            }>{`Switch to ${view === "chart" ? "table" : "chart"}`}</button>
        </div>
        <div>{visualization}</div>
        
    </div>)   
};