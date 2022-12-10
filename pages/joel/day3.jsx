import { useState } from "react";

const Day3 = () => {
  
const [presents, setPresents] = useState([]);
const [inputValue, setInputValue] = useState('')

const handleCatchValue = (e) => {
  const {value} = e.target;
  setInputValue(value)
}

const handleAddItem = () => {
  const newPresent = ({...presents, inputValue})
  setPresents(newPresent)
}

return (
  <div style={styles.body}>
    <div style={styles.container}>
      <p style={styles.title}>Regalos</p>
      <div>
        <input value={inputValue} onChange={handleCatchValue} type="text" name="" id="" />
        <button onClick={handleAddItem}>Agregar</button>
      </div>
      <ul>
        {presents.map((present) => {
          return <li key={present}>{present}</li>
        })}
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
  title: {
    fontFamily: 'Home Christmas',
    color: '#EFF5F5',
    margin: 25,
    fontSize: '2.5rem'
  }
}

