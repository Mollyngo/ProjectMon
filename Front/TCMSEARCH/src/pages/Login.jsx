
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/use-auth";
import Input from "../components/Input";
import Button from "../components/Button";
import Register from "./Register";
import validateLogin from "../validators/validateLogin";

export default function Login() {

    const [open, setOpen] = useState(false);

    const { login } = useAuth();

    const [input, setInput] = useState({
        email: '',
        password: '',
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
            console.log(error)
        }
    }

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        < div >
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
                        {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}

                    </div>
                    <div className="card shrink-0 w-full mt-5  shadow-2xl bg-base-100">
                        <form className="card-body " onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <Input
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
                                <Input
                                    value={input.password}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    onChange={handleChangeInput}
                                />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>

                            <Button bg="green" >Login </Button>


                        </form>
                        <button className="btn btn-secondary m-2" onClick={() => setOpen(true)}>สมัครสมาชิก</button>
                        {open && <Register open={open} setOpen={setOpen} />}

                        <button className="btn btn-alternate m-2" onClick={() => window.location.href = '/admin'}>ผู้ดูแล</button>

                    </div>
                </div>
            </div>
        </div >

    )
}

