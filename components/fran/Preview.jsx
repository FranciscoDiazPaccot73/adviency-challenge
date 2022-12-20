const Preview = ({ show, elements, onClose }) => {
  return (
    <div className={`p-6 flex flex-col justify-center items-center rounded-3xl border glass-white-border bg-glass-minimus md:p-8 mt-3 absolute left-0 ${show ? 'top-full' : 'top-0 -z-10'}`}>
      <p className={`text-2xl mb-4 w-full splash-bg`}>Regalos:</p>
      <ul className={`flex justify-center flex-col w-full splash-bg`}>
        {elements?.map(elem => {
          if (!elem.id) return null;
          
          return (
            <li key={elem.id} className="w-full flex items-center mt-3">
              <img src={elem.url !== '' ? elem.url : '/default-image.png'} alt={elem.name} width={42} height={42} className='mr-2' />
              <div>
                <div className="flex items-center">
                  <span>{elem.name}</span>
                  <p className="ml-2 text-xs">({elem.amount})</p>
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
        </div>
      </div>
    </div>
  )
}

export default Preview;
