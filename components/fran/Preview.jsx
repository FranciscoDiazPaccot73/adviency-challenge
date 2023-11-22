import { useRef } from "react";

const Preview = ({ show, elements, onClose }) => {
  const ref = useRef()

  const printDiv = () => {
    var divContents = ref.current.innerHTML;

    const newWindow = window.open('', '', 'height=500, width=800');
    newWindow.document.write('<html>');
    newWindow.document.write('<body>');
    newWindow.document.write(`<p style="font-size:24px;margin-bottom:16px;width:100%">Regalos:</p>`);
    newWindow.document.write(divContents);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  }

  return (
    <div style={styles.wrapper} className={`rounded-3xl border bg-glass glass-white-border bg-glass-minimus md:p-8 mt-3 absolute left-0 ${show ? 'top-full' : 'top-0 -z-10'}`}>
      <p className="splash-bg" style={styles.title}>Regalos:</p>
      <ul ref={ref} className="splash-bg" style={styles.ul}>
        {elements?.map(elem => {
          if (!elem.id) return null;
          
          return (
            <li key={elem.id} style={styles.li}>
              <img src={elem.url !== '' ? elem.url : '/default-image.png'} alt={elem.name} width={42} height={42} style={styles.img} />
              <div>
                <div style={styles.nameWrapper}>
                  <span>{elem.name}</span>
                  <p style={styles.nameAmount}>({elem.amount})</p>
                </div>
                <p className="text-xs text-slate-400">{elem.receiver}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <div className={`w-full splash-bg`}>
        <div>
          <button onClick={onClose} className="w-full mt-5 rounded-full text-white py-1 hover:text-red-700">
            Cerrar
          </button>
          <button onClick={printDiv} className="hidden w-full mt-5 rounded-full text-white py-1 hover:text-red-700 md:block">
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    padding: '24px',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: "24px",
    marginBottom: '16px',
    width: "100%",
  },
  ul: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '12px'
  },
  img: {
    marginRight: '8px'
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  nameAmount: {
    marginLeft: '8px',
    fontSize: "12px"
  }
}

export default Preview;
