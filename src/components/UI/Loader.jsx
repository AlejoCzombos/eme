import './Loader.css'; // Asegúrate de tener este archivo CSS

export default function Loader({ className}) {
  return (
    <div className='flex flex-col justify-center items-center py-6'>
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* <!-- Chispas --> */}
        <g id="sparkles">
          <circle className="sparkle" cx="20" cy="20" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="100" cy="20" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="20" cy="100" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="100" cy="100" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="60" cy="10" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="60" cy="110" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="10" cy="60" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="110" cy="60" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="35" cy="35" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="85" cy="35" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="35" cy="85" r="4" fill="#44E5E1"></circle>
          <circle className="sparkle" cx="85" cy="85" r="4" fill="#44E5E1"></circle>
        </g>

        {/* <!-- Cruz Médica Delgada --> */}
        <g id="medical-cross">
          {/* <!-- Brazo horizontal --> */}
          <rect x="45" y="55" width="30" height="10" fill="#009F9B" />
          {/* <!-- Brazo vertical --> */}
          <rect x="55" y="45" width="10" height="30" fill="#009F9B" />
        </g>
      </svg>
      <p className='text-primary-600 max-w-xs text-center text-2xl font-bold'>Un momento...<br/>Estamos trayendo lo mejor para vos</p>
    </div>
  );
}
