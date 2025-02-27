import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const Api = "https://to-dos-api.softclub.tj/api/to-dos";
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dataById, setDataById] = useState([]);
  // const [nameById, setNameById] = useState("");
  // const [descById, setDescById] = useState("");
  const [Images, setImages] = useState(null);
  const [isModalById, setIsModalById] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [id, setId] = useState(null);

  const openEditModal = (id, name, description) => {
    setEditId(id);
    setEditName(name);
    setEditDesc(description);
    setEditModal(true);
  };

  function handleClick() {
    if (!localStorage.theme) {
      localStorage.theme = "light";
    }
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark"
    );
  }

  const get = async () => {
    try {
      const response = await fetch(Api);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !desc.trim()) {
      console.log("hamasha pur kun");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);

    if (Images && Images.length > 0) {
      for (let i = 0; i < Images.length; i++) {
        formData.append("images", Images[i]);
      }
    }

    try {
      const response = await fetch(Api, {
        method: "POST",
        body: formData,
      });
      setName("");
      setDesc("");
      setImages(null);
      setIsModalOpen(false);
      get();
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${Api}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting todo:", errorData);
        return;
      }

      get();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await fetch(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${imageId}`,
        {
          method: "DELETE",
        }
      );
      get();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    const updatedData = {
      id: editId,
      name: editName,
      description: editDesc,
    };

    try {
      await fetch(Api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      setEditModal(false);
      get();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const getById = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${Api}/${id}`, { method: "GET" });
      const res = await response.json();
      setDataById(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const CheckboxChange = async (id, isCompleted) => {
    try {
      await fetch(
        `https://to-dos-api.softclub.tj/api/to-dos/completed?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        }
      );

      setData((prevData) =>
        prevData.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    get();
    getById(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6"> TO DO LIST</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-blue-400 font-bold transition mb-6"
        >
          Add User
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Add New User</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full mb-3"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {editModal && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter new name"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Enter new description"
                className="w-full p-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={editUser}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalById && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Get info by ID</h2>

              {dataById ? (
                <div>
                  <p>
                    <strong>Name:</strong> {dataById.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {dataById.description}
                  </p>

                  {dataById.images && dataById.images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {dataById.images.map((img) => (
                        <img
                          key={img.id}
                          src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                          alt="To-Do"
                          className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsModalById(false);
                    setId(null);
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleClick}
          className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition mb-6"
        >
          🌙 Toggle Dark Mode
        </button>

        {data.map((el) => (
          <div
            key={el.id}
            className="bg-blue-100 dark:bg-gray-800 shadow-2xl ring-1 ring-cyan-600 rounded-lg p-6 mb-6 card"
          >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-14 mb-3">

              <div>
                <h2
                  className={`text-xl font-bold ${
                    el.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {el.name}
                </h2>
                <p
                  className={`text-gray-600 dark:text-gray-400 ${
                    el.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {el.description}
                </p>
              </div>
              <button
                onClick={() => deleteUser(el.id)}
                className="bg-red-700 text-white w-[70px] py-1 px-3 rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(el.id, el.name, el.description)}
                className="bg-yellow-700 text-white w-[70px] py-1 px-3 rounded-lg hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setId(el.id);
                  setIsModalById(true);
                }}
                className="bg-lime-800 text-white  w-[70px] py-1 px-3 rounded-lg hover:bg-lime-600 transition"
              >
                Info
              </button>
              <input
                type="checkbox"
                checked={el.isCompleted}
                onChange={() => CheckboxChange(el.id, el.isCompleted)}
                className="mr-2"
              />
            </div>

            <div  className="flex justify-center  md:justify-start">
              {el.images?.slice(0, 4).map((img) => (
                <div key={img.id} className="relative group">
                  <img
                 className="w-40 h-40 object-cover rounded-lg shadow-md"
                    alt={el.name}
                    src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                  />
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 delete-btn"
                  >
                    Delete Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
