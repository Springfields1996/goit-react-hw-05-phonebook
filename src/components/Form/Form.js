import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from '../../styles/style.module.css';

export const Form = props => {
  const [state, setState] = useState({ name: '', number: '' });

  const handleSubmit = evt => {
    evt.preventDefault();
    state.name && state.number
      ? props.onSubmit({ id: uuidv4(), ...state })
      : alert('Fill all fields!');
    setState(state => {
      return { ...state, name: '', number: '' };
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setState(state => {
      return { ...state, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label className={style.formLabel}>
        Name
        <input
          className={style.formInput}
          type="text"
          placeholder="Enter name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <label className={style.formLabel}>
        Number
        <input
          className={style.formInput2}
          type="text"
          placeholder="Enter number"
          name="number"
          value={state.number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={style.addButton}>
        Add contact
      </button>
    </form>
  );
};
