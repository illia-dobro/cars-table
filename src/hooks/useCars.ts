import { useQuery } from '@tanstack/react-query';
// import todoSevice, {Todo} from '../services/todoSevice';
import carsService, { Car, Cars } from '../services/carsService';


  const useCars = () => {

    return useQuery<Car[], Error, Cars >({
      queryKey: ['cars'],
      queryFn: carsService.getAll,
      staleTime: 10 * 1000
    })
}


export default useCars