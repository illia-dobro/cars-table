type Props = {
  selectOption: (option: string) => void
}

function Action({ selectOption }: Props) {


  function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
    selectOption(e.target.value)
  }

  return (
    <>
      <select defaultValue="default" onChange={(e) => handleChange(e)}>
        <option value="default"  disabled>
          Select
        </option>
        <option value="edit">Edit</option>
        <option value="delete">Delete</option>
      </select>
    </>
  );
}

export default Action;
