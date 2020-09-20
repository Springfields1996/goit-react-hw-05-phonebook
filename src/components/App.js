import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import headerStyle from '../styles/header-style.module.css';
import './Filter/filterAnimation.css';
import style from '../styles/style.module.css';
// import formStyle from '../styles/form-style.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
    showNotification: false,
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    localContacts
      ? this.setState({ contacts: JSON.parse(localContacts) })
      : localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidUpdate(x, prevState) {
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  getContact = contact =>
    this.state.contacts.find(elem => elem.name === contact.name)
      ? (this.setState({ showNotification: true }),
        setTimeout(() => {
          this.setState({ showNotification: false });
        }, 1000))
      : this.setState({ contacts: [...this.state.contacts, contact] });

  deleteContact = ({ target: { id } }) => {
    this.setState({
      contacts: [...this.state.contacts.filter(elem => elem.id !== id)],
    });
  };

  setFilter = ({ target }) => this.setState({ filter: target.value });

  render = () => {
    const { contacts, filter, showNotification } = this.state;

    const filterContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase()),
    );

    setTimeout(() => {
      !filterContacts.length && this.setState({ filter: '' });
    }, 2000);

    return (
      <div className={style.main}>
        <CSSTransition
          in={true}
          appear
          timeout={500}
          classNames={headerStyle}
          unmountOnExit
        >
          <h2 className={style.header}>Phonebook</h2>
        </CSSTransition>
        <CSSTransition
          in={showNotification}
          timeout={500}
          classNames="notification"
          unmountOnExit
        >
          <div className={style.existNotification}>
            This name is already exist
          </div>
        </CSSTransition>
        <Form onSubmit={this.getContact} />
        <h2 className={style.header}>Contacts</h2>
        {contacts.length ? (
          <CSSTransition
            in={contacts.length > 1}
            timeout={300}
            classNames="filter"
            unmountOnExit
          >
            <Filter value={filter} onChange={this.setFilter} />
          </CSSTransition>
        ) : (
          <p className={style.noContacts}>No contacts yet...</p>
        )}
        <TransitionGroup component="ul" className={style.list}>
          {filterContacts.map(elem => (
            <CSSTransition key={elem.id} timeout={250} classNames="form">
              <Contacts contact={elem} onDeleteContact={this.deleteContact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  };
}

// export const App = () => {
//   const [state, setState] = useState({ contacts: [], filter: '' });

//   useEffect(() => {
//     // console.log(state, state);
//     const localContacts = localStorage.getItem('contacts');
//     if (localContacts) {
//       setState({ contacts: JSON.parse(localContacts) });
//     } else {
//       return;
//     }
//   }, []);

//   useEffect(() => {
//     // prevContacts.contacts !== state.contacts &&
//     localStorage.setItem('contacts', JSON.stringify(state.contacts));
//   }, [state.contacts]);

//   // useEffect(() => {
//   //   const contactsLocal = localStorage.getItem('contacts');

//   //   if (contactsLocal) {
//   //     const parsedContacts = JSON.parse(contactsLocal);
//   //     this.setState({ contacts: parsedContacts });
//   //   } else {
//   //     return;
//   //   }

//   // }, [])

//   const getContact = contact =>
//     setState({ ...state, contacts: [...state.contacts, contact] });

//   const deleteContact = ({ target: { id } }) => {
//     setState({
//       ...state,
//       contacts: [...state.contacts.filter(elem => elem.id !== id)],
//     });
//   };

//   const setFilter = ({ target }) =>
//     setState({ ...state, filter: target.value });

//   const filterContacts = state.contacts.filter(el =>
//     el.name.toLowerCase().includes(state.filter.toLowerCase()),
//   );

//   setTimeout(() => {
//     !filterContacts.length && setState({ ...state, filter: '' });
//   }, 2000);

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Form getContact={getContact} />
//       <h2>Contacts</h2>
//       <Filter value={state.filter} onChange={setFilter} />
//       <ul style={{ marginTop: 40 }}>
//         <Contacts contacts={filterContacts} onDeleteContact={deleteContact} />
//       </ul>
//     </div>
//   );
// }
