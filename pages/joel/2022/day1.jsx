const present = ['SSD', 'Nokia 1100', 'Vitel Tone']

  const Day1 = () => (
    <div style={styles.container}>
      <p style={styles.title}>Regalos</p>
      <ul>
        {present.map((gift)=>{
          return <li key={gift}>{gift}</li>
        })}
      </ul>
    </div>
  );
  export default Day1;

  const styles = {
    container:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 850,
      margin: 'auto',
      paddingTop: 200
    },
    title:{
      margin: 25,
      fontSize: '2.5rem'
    }
  }
  