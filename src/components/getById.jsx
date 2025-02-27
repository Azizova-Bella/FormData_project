import { useEffect, useState } from "react";
import { Modal, Button } from "antd";

const GetByid = ({ id, Api }) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const getById = async () => {
    try {
      const response = await fetch(`${Api}/${id}`, { method: "GET" });
      const res = await response.json();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getById();
  }, [id]);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:text-blue-800 transition font-semibold"
      >
        Show
      </button>

      <Modal
        title="User Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)} danger>
            Close
          </Button>,
        ]}
        centered
        maskClosable
      >
        <div>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default GetByid;
