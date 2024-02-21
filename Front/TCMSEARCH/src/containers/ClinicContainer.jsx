

export default function ClinicContainer() {
    return (
        <div>
            <div>
                <div>
                    <form className="m-8 gap-y-5 flex flex-col">
                        <div>
                            <h2 className="text-3xl"> clinic.name </h2>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-xl"> ที่อยู่ </h3>
                            <h4> 8/8 ถ. ถนน </h4>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-xl"> อำเภอ </h3>
                            <h4 > อำเภอ </h4>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-xl"> จังหวัด </h3>
                            <h4 > จังหวัด </h4>
                        </div>
                        <div className="flex justify-between">
                            <p> เบอร์โทร</p>
                            <p> โทรศัพท์ </p>
                        </div>
                        <div className="flex justify-between">
                            <p> website</p>
                            <p> เว็บไซต์ </p>
                        </div>
                        <div className="flex justify-between">
                            <p> รายละเอียด </p>
                            <p> รายละเอียด </p>
                        </div>
                    </form>
                </div>
                <div>
                    {/* <h3> รูปภาพ </h3> */}
                </div>
            </div>
        </div>
    )



}