import { ChangeEvent, FormEvent, useState } from 'react';

export const PlaceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void => {
    setFormData(prevState => ({ ...prevState, [event.target.id]: event.target.value }));
  };
  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handlerSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label htmlFor='title'>title:</label>
      <input type='text' id='title' onChange={handleChange} />
      <label htmlFor='description'>description:</label>
      <textarea id='description' onChange={handleChange} />
      <button type='submit'>сохранить данные</button>
    </form>
  );
};
