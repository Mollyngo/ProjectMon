import { useState } from 'react';
import head from '../assets/head.png'

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // ตรงนี้คุณสามารถเขียนโค้ดสำหรับการค้นหา Clinic ได้
    };

    return (
        <div className="container flex flex-col mx-auto p-4">
            <div className="hero h-96" style={{ backgroundImage: 'url("' + head + '")' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        {/* <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <br />
            <div className="join">
                <div className='w-full'>
                    <div className="join-item ">
                        <input className="input input-primary w-full max-w-full join-item" placeholder="ค้นหา" />
                    </div>
                </div>
                <select className="select select-primary select-bordered join-item">
                    <option disabled selected>ค้นหาจาก</option>
                    <option>ชื่อ</option>
                    <option>อำเภอ</option>
                    <option>จังหวัด</option>
                </select>
                <div className="indicator">
                    {/* <span className="indicator-item badge badge-secondary">new</span> */}
                    <button className="btn-primary btn join-item">Search</button>
                </div>
            </div>
            <label className="form-control w-full max-w-full">
                <div className="label">
                    <span className="label-text">จังหวัด</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                <select className="select select-secondary">
                    <option disabled selected>จังหวัด</option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>

            </label>

            <label className="form-control w-full max-w-full">
                <div className="label">
                    <span className="label-text">อำเภอ</span>
                    {/* <span className="label-text-alt">Alt label</span> */}
                </div>
                <select className="select select-secondary">
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
                className="btn-primary btn"
                onClick={handleSearch}
            >
                ค้นหาคลินิก
            </button>
            <br />

            <button className="btn-secondary btn" onClick={() => window.location.href = '/login'}>
                เข้าสู่ระบบ / ลงทะเบียน</button>
        </div>
    );
}
