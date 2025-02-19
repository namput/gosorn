import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">GuSorn</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">หน้าแรก</Link>
        <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">ลงทะเบียน</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">เข้าสู่ระบบ</Link>
      </nav>
    </header>
  );
};
export default Header;
