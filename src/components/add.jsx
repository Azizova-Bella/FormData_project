// import { useState } from "react";
// import { Modal, Input, Button } from "antd";
// const Add = ({ get, Api }) => {
//   const [name, setName] = useState("");
//   const [open, setOpen] = useState(false);

//   const addIt = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch(Api, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name }),
//       });
//       get();
//       setName("");
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div>
// <Button
//   type="primary"
//   onClick={() => setOpen(true)}
// >
// + Add New
// </Button>



//       <Modal
//         title="Add New User"
//         open={open}
//         onCancel={() => setOpen(false)}
//         footer={null}
//         centered
//         maskClosable
//       >
//         <form onSubmit={addIt}>
//           <Input
//             type="text"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mb-3"
//           />

//           <div className="flex justify-end gap-2 mt-3">
//             <Button type="primary" htmlType="submit" className="bg-blue-600">
//               Save
//             </Button>
//             <Button onClick={() => setOpen(false)} danger>
//               Close
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Add;
