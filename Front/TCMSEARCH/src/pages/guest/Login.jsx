import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/use-auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import validateLogin from "../../validators/validateLogin";


export default function Login() {
    const { login, authUser } = useAuth();
    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validationError = validateLogin(input);
            if (validationError) {
                setErr(validationError);
                return;
            }
            await login(input);
            if (authUser) {
                if (authUser.role === 'ADMIN') {
                    navigate('/admin-menu');
                } else {
                    navigate('/user-menu');
                }
            }
        } catch (error) {
            toast.error(err.response?.data.message);
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
                    <div className="card w-full shrink-0 mt-5 shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <Input
                                    placeholder="email"
                                    name="email"
                                    value={input.email}
                                    onChange={handleChangeInput}
                                    errorMessage={err.email}
                                />
                            </div>
                            <div className="form-control mb-8">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <Input
                                    value={input.password}
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    onChange={handleChangeInput}
                                    errorMessage={err.password}

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
