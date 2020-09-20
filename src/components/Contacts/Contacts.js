import React from 'react';
import style from '../../styles/style.module.css';
import './contactsStyle.css';

export const Contacts = ({ contact, onDeleteContact }) => (
  <li className={style.contactList} key={contact.id}>
    {contact.name}: {contact.number}
    <button
      className={style.deleteButton}
      id={contact.id}
      type="button"
      onClick={onDeleteContact}
    >
      Delete
    </button>
  </li>
);
