import { Link } from "react-router-dom";

interface Tutor {
  id: number;
  name: string;
  subject: string;
  province: string;
  price: number;
  rating: number;
  image: string;
}

const TutorCard = ({ tutor }: { tutor: Tutor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 hover:shadow-2xl transition-all">
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-32 h-32 rounded-full object-cover"
      />
      <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
      <p className="text-gray-500">{tutor.subject} | {tutor.province}</p>
      <p className="font-semibold text-blue-600">เริ่มต้น {tutor.price} บาท/ชม.</p>
      <p className="text-yellow-500">⭐️ {tutor.rating}</p>
      <Link
        to={`/tutor/${tutor.id}`}
        className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
      >
        ดูโปรไฟล์
      </Link>
    </div>
  );
};

export default TutorCard;
