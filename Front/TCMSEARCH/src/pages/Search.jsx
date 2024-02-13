import { useState } from 'react';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // ตรงนี้คุณสามารถเขียนโค้ดสำหรับการค้นหา Clinic ได้
    };

    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="ค้นหา" />
                    </div>
                </div>
                <select className="select select-bordered join-item">
                    <option disabled selected>ค้นหาจาก</option>
                    <option>ชื่อ</option>
                    <option>อำเภอ</option>
                    <option>จังหวัด</option>
                </select>
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">new</span>
                    <button className="btn join-item">Search</button>
                </div>
            </div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">จังหวัด</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                <select className="select select-bordered">
                    <option disabled selected>จังหวัด</option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>

            </label>

            <br />
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">อำเภอ</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                <select className="select select-bordered">
                    <option disabled selected>อำเภอ</option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>

            </label>

            <br />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleSearch}
            >
                ค้นหาคลินิก
            </button>
            <br />

            <button className="bg-purple-300 text-white py-2 px-4 rounded-md ">
                เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
