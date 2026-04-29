import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewUsers = () => {
    const nav = useNavigate();
  
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:3000/users");
      setData(users.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit=(id)=>{
      nav(`/edit/${id}`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start p-8">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Users Dashboard
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Password</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {user.userName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-gray-500 truncate max-w-xs">
                    {user.password}
                  </td>

                  <td className="px-6 py-4 flex gap-3 justify-center">
                    
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                    >
                      Delete
                    </button>

                    <button
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
                  onClick={()=>handleEdit(user._id)}
                  >
                      Edit
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;