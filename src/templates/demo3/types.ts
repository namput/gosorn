export interface TutorData {
  id: number;
  userId: number;
  name: string;
  email: string;
  profileImage: string;
  introVideo?: string;
  phone: string;
  location: string;
  subdomain: string;
  bio: string;
  experience?: string | null;
  price: number;
  createdAt: string;
  updatedAt: string;

  subjects: string[];
  levels: string[];           // ฟิลด์นี้เป็น Array ว่าง ๆ ตามตัวอย่าง
  teachingMethods: string[];
  ageGroups: string[];
  courses: Course[];
  schedule: Schedule[];

  User: User;
}
  // types/index.ts

// ข้อมูล Course
export interface Course {
  name: string;
  details: string;
  duration: string;
  price: string;
}

// ข้อมูล Schedule
export interface Schedule {
  day: string;
  time: string;
}

// ข้อมูล User
export interface User {
  id: number;
  email: string;
  username: string;
}
export interface TutorApiResponse {
  message: string;
  data: TutorData;
}

  