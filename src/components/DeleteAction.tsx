import { deleteCar, toLocalHost } from '../helpers/mutate';
import { Car } from '../services/carsService';

type Props = {
  id: number;
  setCars: React.Dispatch<React.SetStateAction<any>>;
  cars: Car[];
  setOpenModal: (arg: boolean) => void;
};

function DeleteAction({ id, setCars, cars, setOpenModal }: Props) {
  const handleClick = () => {
    console.log(1111);
    const carsUpdate = deleteCar(id, cars);
    setCars(carsUpdate);
    toLocalHost(carsUpdate);
    setOpenModal(false);
  };

  return (
    <>
      <div className="text-center">
        <p className="pb-4">Are you sure you want to delete this item?</p>

        <button
          onClick={handleClick}
          type="button"
          className="rounded-md bg-red-50 px-8 py-1.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
        >
          Ok
        </button>
      </div>
    </>
  );
}

export default DeleteAction;
