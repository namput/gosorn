export interface TutorData {
    name: string;
    profileImage: string;
    introVideo: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    courses: {
      name: string;
      details: string;
      duration: string;
      price: string;
    }[];
    schedule: {
      day: string;
      time: string;
    }[];
  }
  