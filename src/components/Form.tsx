import { useState } from 'react';
import { createCar, toLocalHost, updateCar } from '../helpers/mutate';
import { Car } from '../services/carsService';

interface Props {
  carData: Car;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<any>>;
  id: number;
  setOpenModal: (arg: boolean) => void;
  isCreate: boolean;
}

const Form = ({
  carData,
  cars,
  setCars,
  id,
  setOpenModal,
  isCreate,
}: Props) => {
  const [color, setColor] = useState(carData.car_color);
  const [price, setPrice] = useState(carData.price);
  const [availability, setAvailability] = useState(carData.availability);
  const [car, setCar] = useState(carData.car);
  const [model, setModel] = useState(carData.car_model);
  const [vin, setVin] = useState(carData.car_vin);
  const [year, setYear] = useState(carData.car_model_year);

  console.log(cars);

  // Handle form submission
  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!isCreate) {
      const updatedCars = updateCar(id, cars, color, price, availability);
      setCars(updatedCars);
      toLocalHost(updatedCars);
    } else {
      const addNewCar: Car = {
        id: carData.id,
        car,
        car_model: model,
        car_color: color,
        car_model_year: year,
        car_vin: vin,
        price: price,
        availability,
      };

      const creatNewListOfCars = createCar(cars, addNewCar);

      setCars(creatNewListOfCars);
      toLocalHost(creatNewListOfCars);
    }

    setOpenModal(false);
  };

  return (
    <div>
      <h2>Edit Car Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="company"
          >
            Company:
          </label>
          <input
            required
            onChange={(e) => setCar(e.target.value)}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="company"
            value={car}
            disabled={!isCreate}
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="model"
          >
            Model:
          </label>
          <input
            required
            onChange={(e) => setModel(e.target.value)}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="model"
            value={model}
            disabled={!isCreate}
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="vin"
          >
            VIN:
          </label>
          <input
            required
            onChange={(e) => setVin(e.target.value)}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="vin"
            value={vin}
            disabled={!isCreate}
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="year"
          >
            Year:
          </label>
          <input
            required
            pattern="^(?:19|20)\d{2}$"
            title="Years between 1900 and 2099"
            onChange={(e) => setYear(e.target.value)}
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="year"
            value={year}
            disabled={!isCreate}
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="color"
          >
            Color:
          </label>
          <input
            required
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            // Enable or disable based on the desired logic
          />
        </div>
        <div className="mt-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            required
            className="block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            pattern="^\$\d+(,\d{3})*(\.\d+)?$"
            title="Price should begin with $ and contains numbers"
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // Enable or disable based on the desired logic
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="availability"
          >
            Availability
          </label>
          <input
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            type="checkbox"
            id="availability"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            // Enable or disable based on the desired logic
          />
        </div>

        <div className="pt-8">
          <button
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
