import Joi from "joi";
import { useState } from "react";
// import { login } from "../api/auth-api";
import { toast } from "react-toastify";


export default function Login() {

    const validate = schema => input => {
        const { error } = schema.validate(input, { abortEarly: false });

        if (error) {
            const result = error.details.reduce((acc, el) => {
                acc[el.path[0]] = el.message;
                return acc;
            }, {});
            return result;
        }
    };


    const loginSchema = Joi.object({
        email: Joi.string().required().message("กรุณากรอกอีเมล"),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().message("กรุณากรอกรหัสผ่าน")

    })
    const validateLogin = input => {
        const { error } = loginSchema.validate(input);
        return error;
    }


    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({})


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validateError = validateLogin(input);
            if (validateError) {
                return setError(validateError)
            }
            await login(input)
            toast.success("เข้าสู่ระบบสําเร็จ")
        } catch (error) {
            toast.error("เข้าสู่ระบบไม่สําเร็จ")
        }
    }

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
                        {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}

                    </div>
                    <div className="card shrink-0 w-full mt-5  shadow-2xl bg-base-100">
                        <form className="card-body " onSummit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    value={input.email}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    value={input.password}
                                    placeholder="password"
                                    className="input input-bordered"
                                    onChange={handleChangeInput}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" onClick={() => window.location.href = '/search'}>Login</button>
                            </div>


                        </form>
                        <button className="btn btn-secondary" onClick={() => window.location.href = '/register'}>สมัครสมาชิก</button>

                        <button className="btn btn-alternate" onClick={() => window.location.href = '/admin'}>ผู้ดูแล</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

