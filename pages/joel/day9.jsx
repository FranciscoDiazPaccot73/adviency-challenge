import { useEffect, useState } from "react";

  const Day9 = () =>{
    const [presents, setPresents] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [count, setCount] = useState(1)

    const handleCatchValue = (e)=>{
      const {value} = e.target;
      setInputValue(value)
    }

    const handleAddItem = ()=>{
      if(presents.find(item=>item.name === inputValue)){
        console.log('Error');
      }else{
        const newPresent = {name: inputValue, count:count, id:inputValue}
        const newPresents = [...presents, newPresent];
        setPresents(newPresents, count);
        setInputValue('')
        setCount(1)
      }
    }

    const deleteItem = (id)=>{
      const itemToDelete = presents.filter(gift => gift !== id)
      setPresents(itemToDelete)
    }

    const clear = ()=>{
      setPresents([])
    }

    const handleToAdd = ()=>{
      setCount(count + 1)
    }

    const handleToSubtract = ()=>{
      if(count > 1){
        setCount(count - 1)
      }
    }

    useEffect(()=>{
      localStorage.setItem('presentsKey', JSON.stringify(presents));
    }, [presents]);

    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <p style={styles.title}>Regalos</p>
          <div style={styles.inputGroup}>
            <input value={inputValue} onChange={handleCatchValue} placeholder="Ingresa tu regalo" type="text" />
            <button style={styles.button} onClick={handleToSubtract}>-</button>
            <span>{count}</span>
            <button style={styles.button} onClick={handleToAdd}>+</button>
            <button style={styles.button} onClick={handleAddItem}>Agregar</button>
          </div>
          {presents.length === 0 ?
            <p style={styles.empty}>Tu lista está vacia, agrega algun regalo :c</p>
            : <ul style={styles.presents}>
              {presents.map(gift => (
                <li style={styles.itemList} key={gift.id}>
                  <span>{gift.name}</span>
                  <p style={styles.count}>x{gift.count}</p>
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
  export default Day9;
  
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
      width: 370,
      margin: '0 0 20px',
      alignItems: 'center',
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
    },
    count:{
      color:'#7F8487'
    }
  }
  