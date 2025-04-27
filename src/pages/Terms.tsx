const TermsAndConditions = ({ darkMode }: { darkMode: boolean }) => {
    return (
      <div className={`p-6 min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">📜 ข้อกำหนดและเงื่อนไขการใช้งาน</h1>
            <p className="text-gray-500 dark:text-gray-400">โปรดอ่านและทำความเข้าใจข้อกำหนดก่อนใช้งานแพลตฟอร์ม</p>
          </div>
  
          {/* Content */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6 leading-relaxed text-justify text-sm md:text-base">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. การลงทะเบียน</h2>
              <p>ผู้ใช้งานต้องให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบันเพื่อการลงทะเบียนใช้งานแพลตฟอร์มของเรา</p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">2. ข้อห้ามการใช้งาน</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>ห้ามโพสต์เนื้อหาที่ไม่เหมาะสม ผิดกฎหมาย หรือสร้างความเสียหายต่อบุคคลอื่น</li>
                <li>ห้ามใช้ข้อมูลปลอมเพื่อหลอกลวงผู้อื่น</li>
                <li>ห้ามละเมิดสิทธิ์ทรัพย์สินทางปัญญาของบุคคลอื่น</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">3. ความรับผิดชอบของผู้ใช้งาน</h2>
              <p>ผู้ใช้งานต้องรับผิดชอบต่อการกระทำทั้งหมดที่เกิดขึ้นผ่านบัญชีของตนเอง รวมถึงการดูแลรักษารหัสผ่านอย่างเคร่งครัด</p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">4. การชำระเงินและค่าธรรมเนียม</h2>
              <p>การชำระเงินจะถือว่าสมบูรณ์เมื่อได้รับการยืนยันจากธนาคาร และไม่มีสิทธิ์เรียกคืนเงินยกเว้นในกรณีที่ระบบยืนยันว่ามีความผิดพลาด</p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">5. การยกเลิกและการระงับบัญชี</h2>
              <p>แพลตฟอร์มมีสิทธิ์ในการระงับหรือยกเลิกบัญชีของผู้ใช้งานที่ละเมิดข้อกำหนด โดยไม่ต้องแจ้งล่วงหน้า</p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">6. การเปลี่ยนแปลงข้อกำหนด</h2>
              <p>แพลตฟอร์มขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดการใช้งานได้ทุกเมื่อ โดยจะแจ้งเตือนผู้ใช้งานผ่านหน้าเว็บไซต์</p>
            </section>
  
            <section>
              <h2 className="text-xl font-semibold mb-3">7. การติดต่อสอบถาม</h2>
              <p>หากมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม กรุณาติดต่อทีมงานผ่านทางอีเมล support@example.com</p>
            </section>
  
          </div>
        </div>
  
      </div>
    );
  };
  
  export default TermsAndConditions;
  