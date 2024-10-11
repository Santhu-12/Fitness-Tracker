const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="30" // Reduced size
        height="30"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4CAF50"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M10,50 L30,40 L50,60 L70,30 L90,50"
          stroke="#4CAF50"
          strokeWidth="5"
          fill="none"
        />
      </svg>
      <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
        Fitness Tracker
      </h1>
    </div>
  );
};

export default Logo;
