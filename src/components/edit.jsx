import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

function Edit({ Api, name1, id, get }) {
  const [editModel, setEditMOdal] = useState(false);
  const [name, setName] = useState(name1 || ""); 

  const editUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(Api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: name }), 
      });
      setEditMOdal(false);
      get();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Edit User"
        open={editModel}
        onCancel={() => setEditMOdal(false)}
        footer={null}
        centered
        maskClosable
      
      >
        <form onSubmit={editUser}>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          />

          <div className="flex justify-end gap-2 mt-3">
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Save
            </Button>
            <Button onClick={() => setEditMOdal(false)} danger>
              Close
            </Button>
          </div>
        </form>
      </Modal>

      <button
        onClick={() => setEditMOdal(true)}
        className="text-amber-500 hover:text-amber-700 transition font-semibold"
      >
        Edit
      </button>
    </div>
  );
}

export default Edit;
