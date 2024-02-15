export default function AdminMenu() {
    return (
        <div>
            <div>
                <div className="flex flex-col mt-5 items-center">
                    <h1 className="text-2xl font-bold mb-4">หน้าAdmin</h1>

                    <button className="btn-primary btn mt-2 w-80"
                    >Approve คลินิก</button>
                    <button className="btn-secondary btn mt-2 w-80">เพิ่มคลินิก</button>
                    <button className="btn-secondary btn mt-2 w-80">แก้ไขคลินิก</button>
                    <button className="btn-secondary btn mt-2 w-80">ดูข้อมูลตลินิก</button>
                    <button className="btn-accent btn mt-2 w-80">ลบคลินิก</button>
                    {/* <button className="btn-primary btn mt-2 w-80">Item 1</button> */}
                </div>
            </div>
            <div></div>
            <div className="flex flex-col mt-5 items-center">
                <button
                    className="btn-alt btn mt-2 w-full"
                    onClick={() => window.location.href = '/login'}
                >
                    ย้อนกลับ
                </button>
            </div>
        </div>
    )
}