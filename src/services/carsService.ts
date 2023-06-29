import APIClient from './apiClient';

export interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: string;
  car_vin: string;
  price: string;
  availability: boolean
}

export interface Cars {
  cars: Car[]
}


export default new APIClient<Car>('/cars');
