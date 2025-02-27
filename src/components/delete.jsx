function Delete({ Api, get, id }) {
  const deleteUser = async () => {
    try {
      await fetch(`${Api}?id=${id}`, { method: "DELETE" });
      get();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={deleteUser}
        className="text-red-600 hover:text-red-800 transition font-semibold"
      >
        Delete
      </button>
    </div>
  );
}
export default Delete;
