import { useEffect, useState } from "react";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { getUsers, updateUserRole } from "../services/adminService";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
  referralCode: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const paginatedUsers = filteredUsers.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handleUpdateUserRole = async (id: number, newRole: "user" | "admin") => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนสิทธิ์เป็น ${newRole}?`)) return;

    try {
      await updateUserRole(id, newRole);
      toast.success(`✅ อัปเดตสิทธิ์เป็น ${newRole} เรียบร้อย`);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      toast.error("❌ เกิดข้อผิดพลาดในการอัปเดตสิทธิ์");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">👤 จัดการสมาชิก</h1>

      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="🔍 ค้นหาผู้ใช้..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      ) : (
        <>
<table className="w-full text-left border-collapse">
  <thead>
    <tr className="bg-gray-300">
      <th className="p-2 text-sm md:text-base">ชื่อผู้ใช้</th>
      <th className="p-2 text-sm md:text-base">อีเมล</th>
      <th className="p-2 text-sm md:text-base">สิทธิ์</th>
      <th className="p-2 text-sm md:text-base">รหัสเชิญ</th> {/* ✅ เพิ่มคอลัมน์ */}
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id} className="border-b border-gray-300">
        <td className="p-2">{user.username}</td>
        <td className="p-2">{user.email}</td>
        <td className="p-2">
          <select value={user.role} onChange={(e) => handleUpdateUserRole(user.id, e.target.value as "user" | "admin")} className="bg-gray-700 text-white p-2 rounded">
            <option value="user">ผู้ใช้ทั่วไป</option>
            <option value="admin">ผู้ดูแลระบบ</option>
          </select>
        </td>
        <td className="p-2">{user.referralCode || "❌ ไม่มีรหัส"}</td> {/* ✅ แสดงรหัสเชิญ */}
      </tr>
    ))}
  </tbody>
</table>


          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={currentPage === 1}
            >
              ก่อนหน้า
            </button>
            <span>
              หน้า {currentPage} จาก{" "}
              {Math.ceil(filteredUsers.length / itemsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredUsers.length / itemsPerPage))
                )
              }
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)}
            >
              ถัดไป
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersManagement;
