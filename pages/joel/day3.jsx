import { useState } from "react";

const Day3 = () => {

  const [presents, setPresents] = useState([]);
  const [inputValue, setInputValue] = useState('')

  const handleCatchValue = (e) => {
    const { value } = e.target;
    setInputValue(value)
  }

  const handleAddItem = () => {
    const newPresent = ([...presents, inputValue])
    setInputValue('')
    setPresents(newPresent)
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <p style={styles.title}>Regalos</p>
        <div style={styles.inputGroup}>
          <input value={inputValue} onChange={handleCatchValue} type="text" placeholder="Ingresar Regalo" />
          <button style={styles.button} onClick={handleAddItem}>Agregar</button>
        </div>
        <ul style={styles.presents}>
          <li>
            {presents.map((present) => {
              return <li key={present}>{present}</li>
            })}
          </li>
        </ul>
      </div>
    </div>
  )
};
export default Day3;

const styles = {
  body: {
    backgroundImage: 'linear-gradient(to right, #D6E4E5 0%, #497174 100%)',
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
    backgroundColor: '#EB6440',
    alignItems: 'center',
    padding: '5px 10px',
    border: 'transparent',
    borderRadius: 10,
    boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'
  },
  presents:{
    display:'flex',
    backgroundColor: '#3F4E4F',
    borderRadius: 10,
    width: 275,
    padding: '5px 10px',
  },
  title: {
    fontFamily: 'Home Christmas',
    color: '#EFF5F5',
    margin: 25,
    fontSize: '2.5rem'
  }
}

