import React from 'react';
import { Link } from 'react-router-dom';
import validateRegister from '../validators/validate-register';
import useAuth from '../hooks/use-auth';
import Input from '../components/Input';
import Button from '../components/Button';

const initial = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',

}


export default function Register({ onSuccess }) {

    const [input, setInput] = React.useState(initial);
    const [error, setError] = React.useState(null);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validateError = validateRegister(input);
            if (validateError) {
                return setError(validateError);
                
            }

            await register(input);
            setError(null);
            onSuccess();

        } catch (error) {
            return error.response.data;
        }
    }

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className="  bg-white px-6 py-5  ">

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">สมัครสมาชิก</h2>

            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            ชื่อ
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="text"
                                name="firstName"
                                value={input.firstName}
                                onChange={handleChangeInput}
                                errorMessage={error?.firstName}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            นามสกุล
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="text"
                                name="lastName"
                                value={input.lastName}
                                onChange={handleChangeInput}
                                errorMessage={error?.lastName}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
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
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            เบอร์โทร
                        </label>
                        <div className="relative mt-2.5">

                            <Input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={handleChangeInput}
                                errorMessage={error?.phoneNumber}
                            />
                        </div>
                    </div>


                </div>
                <div className="mt-10 items-center">
                    <Button type="submit" className="w-full" >
                        สมัครสมาชิก
                    </Button>


                </div>
            </form >
            <Button type="submit" className="w-full" >
                <Link to="/login">
                    ย้อนกลับ
                </Link>
            </Button>
        </div >
    )
}
