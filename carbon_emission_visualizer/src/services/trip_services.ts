import axios, { type AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';
import { type TripLog, type TripDetails } from '../types/trip_types';

class TripsProvider {
  addTrip(data: TripDetails): Observable<void> {
    return from(
      axios.post('/api/trips', data).then(() => {})
    );
  }

  fetchTrips():  Promise<AxiosResponse<TripLog[], any>> {
    return axios.get<TripLog[]>('/api/trips')
  }

}

export const tripsProvider = new TripsProvider();