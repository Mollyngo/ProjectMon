import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/use-auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import validateLogin from "../validators/validateLogin"; // นำเข้าฟังก์ชันตรวจสอบข้อมูล
import { Link } from "react-router-dom";


export default function Login() {
    const { login } = useAuth();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = input;
            validateLogin(input);
            const response = await login(email, password);
            if (response) {
                toast.success("เข้าสู่ระบบสำเร็จ");
                if (response.user.role === "ADMIN") {
                    navigate("/admin-menu");
                } else {
                    navigate("/user-menu");
                    if (response.user.role === "USER") {
                        navigate("/user-menu");
                    }
                }
            }
        } catch (error) {
            toast.error("เข้าสู่ระบบไม่สำเร็จ");
            console.log(error);
        }
    };

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        navigate("/auth/register");
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">เข้าสู่ระบบ</h1>
                    </div>
                    <div className="card shrink-0 w-full mt-5 shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
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
                                    type="password"
                                    className="input input-bordered"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <Button bg="green" type="submit" onClick={handleSubmit}>
                                Login
                            </Button>
                        </form>
                        <button className="btn btn-secondary m-2" onClick={handleRegister}>
                            สมัครสมาชิก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
