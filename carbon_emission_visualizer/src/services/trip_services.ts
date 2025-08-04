import axios from 'axios';
import { from, Observable } from 'rxjs';
import type { TripDetails } from '../types/trip_types';

class TripsProvider {
  addTrip(data: TripDetails): Observable<void> {
    return from(
      axios.post('api/trips', data).then(() => {})
    );
  }

}

export const tripsProvider = new TripsProvider();