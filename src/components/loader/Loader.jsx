const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
      
      {/* Cooking Animation */}
      <div className="relative flex items-center justify-center">
        <div className="text-7xl animate-bounce">
          🍳
        </div>

        <div className="absolute -top-8 text-3xl animate-pulse">
          💨
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        Preparing Your Recipe Details With AI...
      </h2>

      <p className="mt-2 text-gray-500">
        Good food details takes a little time 👨‍🍳
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-3 mt-6 overflow-hidden bg-gray-200 rounded-full">
        <div className="h-full rounded-full bg-[#E63946] animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>

    </div>
  );
};

export default Loader;