import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import validateRegister from '../validators/validate-register';
import useAuth from '../hooks/use-auth';
import Input from '../components/Input';
import Button from '../components/Button';

const initial = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    mobile: '',
}

export default function Register() {

    const [input, setInput] = React.useState(initial);
    const [error, setError] = React.useState({});
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validationError = validateRegister(input);
            if (validationError) {
                setError(validationError);
                return setError(validationError);
            }
            console.log("input: ", input);

            await register(input);
            toast.success("Register Successfully");
        } catch (err) {
            if (err.response.data.message === "EMAIL_MOBILE_IN_USE") {
                setError({ emailOrMobile: "already in use" })
            }
            console.log("error: ", err);
            toast.error(err.response?.data.message);
        }
    }

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className=" px-6 py-5  ">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">สมัครสมาชิก</h2>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto my-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            ชื่อ
                        </label>
                        <div className="mt-2.5">
                            <Input
                                name="first_name"
                                value={input.first_name}
                                onChange={handleChangeInput}
                                errorMessage={error?.first_name}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            นามสกุล
                        </label>
                        <div className="mt-2.5">
                            <Input
                                name="last_name"
                                value={input.last_name}
                                onChange={handleChangeInput}
                                errorMessage={error?.last_name}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleChangeInput}
                                errorMessage={error?.email}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={handleChangeInput}
                                errorMessage={error?.email}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            เบอร์โทร
                        </label>
                        <div className="relative mt-2.5">
                            <Input
                                type="text"
                                name="mobile"
                                value={input.mobile}
                                onChange={handleChangeInput}
                                errorMessage={error?.mobile}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <button className="w-full bg-purple-300 p-2 round-xl" type='submit'  >
                    สมัครสมาชิก
                </button>
            </form >
            <Button type="submit" className="w-full pt-10 mt-12" >
                <Link to="/auth/login">ย้อนกลับ</Link>
            </Button>
        </div >
    )
}
