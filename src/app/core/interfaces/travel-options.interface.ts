export interface VehicleType {
  name: string;
  maxPassengers: number;
}

export interface Listing {
  name: string;
  pricePerPassenger: number;
  vehicleType: VehicleType;
}

export interface TravelOptions {
  from: string;
  to: string;
  listings: Listing[];
}
