import { useState } from "react";

const Day7 = () => {

  const [presents, setPresents] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleCatchValue = (e) => {
    const { value } = e.target;
    setInputValue(value)
  }

  const handleAddItem = () => {

    if ((presents.includes(inputValue)) || (inputValue === '')) {
      console.log('Error')
    } else {
      const newPresents = [...presents, inputValue]
      setPresents(newPresents);
      setInputValue('');
    }
  }

  const clear = () => {
    setPresents([])
  }

  const deleteItem = (id) => {
    const itemToDelete = presents.filter(gift => gift !== id)
    setPresents(itemToDelete)
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <p style={styles.title}>Regalos</p>
        <div style={styles.inputGroup}>
          <input value={inputValue} onChange={handleCatchValue} type="text" />
          <button style={styles.button} onClick={handleAddItem}>Agregar</button>
        </div>
        {presents.length === 0 ?
          <p style={styles.empty}>Tu lista está vacia, agrega algun regalo :c</p>
          : <ul style={styles.presents}>
            {presents.map(gift => (
              <li style={styles.itemList} key={gift}>
                <span>{gift}</span>
                <button onClick={() => deleteItem(gift)}>X</button>
              </li>
            )
            )}
          </ul>}

        <button onClick={clear} style={styles.button}>Borrar todo</button>
      </div>
    </div>
  );
}
export default Day7;

const styles = {
  body: {
    backgroundImage: 'linear-gradient(to right, #E1415F 0%, #5B1A1A 100%)',
    height: '100vh'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 850,
    margin: 'auto',
    paddingTop: 200,
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 275,
    margin: '0 0 20px'
  },
  button: {
    backgroundImage: 'linear-gradient(to right, #50D5B7 0%, #067D68 100%)',
    alignItems: 'center',
    padding: '5px 10px',
    border: 'transparent',
    borderRadius: 10,
    boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'
  },
  presents: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#3F4E4F',
    borderRadius: 10,
    width: 275,
    margin: '0 0 10px',
    padding: '5px 10px',
  },
  empty: {
    marginBottom: 20
  },
  itemList: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Home Christmas',
    color: '#ffde59',
    margin: 25,
    fontSize: '2.5rem'
  }
}
