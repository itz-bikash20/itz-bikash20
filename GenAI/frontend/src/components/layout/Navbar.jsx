function Navbar() {
  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">
        Enterprise GenAI
      </h1>

      <button
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;