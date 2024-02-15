export default function UserMenu() {
    return (
        <div className="flex flex-col mt-5 items-center">
            <h1 className="text-2xl font-bold mb-4">หน้าสมาชิก</h1>
            <button className="btn-primary btn mt-2 w-80">เพิ่มคลินิก</button>
            <button className="btn-secondary btn mt-2 w-80">แก้ไขคลินิก</button>
            <button className="btn-secondary btn mt-2 w-80">ดูข้อมูลตลินิก</button>
            <button className="btn-accent btn mt-2 w-80">แก้ไขข้อมูลส่วนตัว</button>
            <button className="btn-accent btn mt-2 w-80">ออกจากระบบ</button>
        </div>
    )
}