import { type JSX } from "react";
import { FuelType, TransportType, VehicleType, type TripDetails } from "../types/trip_types";
import { Controller, useForm } from "react-hook-form";
import './trip-form.css'

type TripFormProps = {
    onSubmit: (data: TripDetails) => void;
};

export function TripForm(props: TripFormProps): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<TripDetails>({
        defaultValues: {
            transportType: TransportType.default,
            vehicle: VehicleType.default,
            fuel: FuelType.default,
            destination: '',
            origin: '',
            people: 1,
        }
    });

    const onSubmit = (data: TripDetails) => { };
  
    return (<form onSubmit={handleSubmit(onSubmit)} className="trip-form">
      <h2>Add Trip</h2>
      <label>
        Origin:
        <Controller
          name="origin"
          control={control}
          rules={{ required: 'Origin is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.origin && <p className="error">{errors.origin.message}</p>}
      </label>

      <label>
        Destination:
        <Controller
          name="destination"
          control={control}
          rules={{ required: 'Destination is required' }}
          render={({ field }) => <input {...field} />}
        />
        {errors.destination && <p className="error">{errors.destination.message}</p>}
      </label>

      <label>
        Transport Type:
        <Controller
          name="transportType"
          control={control}
          render={({ field }) => (
            <select {...field}>
              {Object.values(TransportType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        />
      </label>

    <label>
        Vehicle:
        <Controller
          name="vehicle"
          control={control}
          render={({ field }) => (
            <select {...field}>
              {Object.values(VehicleType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        />
      </label>

     <label>
        Fuel:
        <Controller
          name="fuel"
          control={control}
          render={({ field }) => (
            <select {...field}>
              {Object.values(FuelType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
