const presents = ['SSD', 'Nokia 1100', 'Vitel Tone']

const Day2 = () => (
  <div style={styles.body}>
    <div style={styles.container}>
      <p style={styles.title}>Regalos</p>
      <ul>
        {presents.map((present) => {
          return <li key={present}>{present}</li>
        })}
      </ul>
    </div>
  </div>
);
export default Day2;

const styles = {
  body:{
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
