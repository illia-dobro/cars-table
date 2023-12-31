import { toLocalHost, searchById, fromLocalHost } from '../helpers/mutate';
import { useEffect, useState } from 'react';

import { Car } from '../services/carsService';
import APIClient from '../services/carsService';
import Action from './Action';
import Modal from './Modal';
import DeleteAction from './DeleteAction';
import Form from './Form';
import { modelCar } from '../helpers/modelCar';

const PER_PAGE = 20;

function Table() {
  const [cars, setCars] = useState<Car[]>([]);
  const [displayCarPage, setDisplayCarsPage] = useState(PER_PAGE);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cars } = await APIClient.getAll();
        setCars(cars);
        toLocalHost(cars);
      } catch (error) {
        console.log(error);
      }
    };
    const dataLocal = fromLocalHost();

    if (dataLocal) {
      setCars(dataLocal);
    } else {
      fetchData();
    }
  }, []);

  const dataLength = cars.length;

  const page = cars.slice(displayCarPage - PER_PAGE, displayCarPage);

  function handlePrevious() {
    if (displayCarPage > PER_PAGE) {
      setDisplayCarsPage((prev) => prev - PER_PAGE);
    }
  }
  function handleNext() {
    if (displayCarPage < dataLength)
      setDisplayCarsPage((prev) => prev + PER_PAGE);
  }

  function handleSelected(id: number, option: string): void {
    setSelectedId(id);
    setSelectedAction(option);
    setOpenModal(true);
    setIsCreate(false);
  }

  function handleCreateCar() {
    setSelectedAction('')
    setIsCreate(true);
    setSelectedId(0);
    setOpenModal(true);
  }

  return (
    <>
      <Modal
        insideModal={
          selectedAction === 'delete' ? (
            <DeleteAction
              id={selectedId}
              setCars={setCars}
              cars={cars}
              setOpenModal={setOpenModal}
            />
          ) : (
            <Form
              isCreate={isCreate}
              setOpenModal={setOpenModal}
              id={selectedId}
              cars={cars}
              carData={searchById(selectedId) || modelCar}
              setCars={setCars}
            />
          )
        }
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <button
              onClick={handleCreateCar}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Car
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      VIN
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Year
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Availability
                    </th>
                    <th
                      scope="col"
                      className="pl-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {page.map(
                    ({
                      id,
                      car,
                      car_model,
                      car_color,
                      car_model_year,
                      car_vin,
                      price,
                      availability,
                    }: Car) => (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {car}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {car_model}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {car_vin}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {car_color}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {car_model_year}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {availability ? 'Yes' : 'No'}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Action
                            selectOption={(option: string) =>
                              handleSelected(id, option)
                            }
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{displayCarPage - PER_PAGE + 1}</span>{' '}
            to <span className="font-medium">{displayCarPage <= dataLength ? displayCarPage : dataLength}</span> of{' '}
            <span className="font-medium">{dataLength}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            onClick={handlePrevious}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </button>
        </div>
      </nav>
    </>
  );
}

export default Table;
