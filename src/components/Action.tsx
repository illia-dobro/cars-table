import { useEffect, useState } from 'react';

type Props = {
  selectOption: (option: string) => void;
};

function Action({ selectOption }: Props) {
  const [state, setState] = useState('default');

  useEffect(() => {
    setState('default');
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState(e.target.value);
    selectOption(e.target.value);
  }

  return (
    <>
      <select value={state} onChange={(e) => handleChange(e)}>
        <option value="default" disabled>
          Select
        </option>
        <option value="edit">Edit</option>
        <option value="delete">Delete</option>
      </select>
    </>
  );
}

export default Action;
