middlewares /: Authentication middleware
การตรวจสอบ token:
ตรวจสอบว่า token ถูกต้องหรือไม่
ดึงข้อมูลผู้ใช้จาก token
ตรวจสอบว่า token หมดอายุหรือไม่
รีเฟรช token(ถ้ามี)
การจัดการสิทธิ์:
ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึง endpoint หรือไม่
กำหนดบทบาทผู้ใช้(ถ้ามี)
ตัวอย่างเพิ่มเติม:
การบันทึกกิจกรรมการเข้าถึง
การจัดการ CSRF