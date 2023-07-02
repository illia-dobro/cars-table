import { Car} from "../services/carsService"

export const toLocalHost = (data: Car[]) => {
  window.localStorage.setItem('saveCars', JSON.stringify(data))
}

export const fromLocalHost = () => {
  return JSON.parse(window.localStorage.getItem('saveCars') || '""')
}


export const deleteCar = (id: number, cars: Car[]) => {
  return cars.filter(el => el.id !== id)
}

export const updateCar = (id: number, cars: Car[], color: string, price: string, availability: boolean) => {

  return cars.map(el => el.id === id ? {...el, car_color:color, price, availability} : el)
}


export const createCar = (cars: Car[], newCar: Car) => {
  return [newCar, ...cars]
}

export const searchById = (id: number) => {
  return fromLocalHost() && fromLocalHost().filter((el: Car) => el.id === id)[0]
}

