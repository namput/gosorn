const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"; // ✅ รองรับ .env
  export const forumService = {
    // ✅ ดึงกระทู้ทั้งหมด
    async getThreads() {
      try {
        const response = await fetch(`${API_BASE_URL}/forum/threads`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "ไม่สามารถโหลดกระทู้ได้");
        }
  
        return await response.json();
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message || "เกิดข้อผิดพลาดในการโหลดกระทู้");
      }
    },
  
    // ✅ ดึงกระทู้ตาม ID
    async getThreadById(threadId: number) {
      try {
        const response = await fetch(`${API_BASE_URL}/forum/threads/${threadId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "ไม่พบกระทู้");
        }
  
        return await response.json();
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message || "เกิดข้อผิดพลาดในการโหลดกระทู้");
      }
    },
  
    // ✅ สร้างกระทู้ใหม่ (เปลี่ยน `/forum/create` เป็น `/forum/threads`)
    async createThread(title: string, content: string) {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch(`${API_BASE_URL}/forum/threads`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ ใช้ Token ยืนยันตัวตน
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ ต้องใช้เพราะ API ต้องการ Credentials
          body: JSON.stringify({ title, content }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "ไม่สามารถสร้างกระทู้ได้");
        }
  
        return await response.json();
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message || "เกิดข้อผิดพลาดในการสร้างกระทู้");
      }
    },
    async addReply(threadId: number, content: string) {
        const token = localStorage.getItem("token");
    
        try {
          const response = await fetch(`${API_BASE_URL}/forum/replies`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`, // ✅ ใช้ Token ยืนยันตัวตน
              "Content-Type": "application/json",
            },
            credentials: "include", // ✅ ต้องใช้เพราะ API ต้องการ Credentials
            body: JSON.stringify({ thread_id: threadId, content }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "ไม่สามารถเพิ่มความคิดเห็นได้");
          }
    
          return await response.json();
        } catch (error) {
          const err = error as Error;
          throw new Error(err.message || "เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
        }
      },
  };
  