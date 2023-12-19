import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const err: any = {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //TODO: continue login api call
      const res = await publicRequest.post("/auth/register", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/login");
      }
      console.log(res);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-[90vw] hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:ml-8">
          <h1 className="text-5xl font-bold">Join Us!</h1>
          <p className="py-6">Experience the Nike Shop experience today</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <p className=" text-red-600" hidden={!isError}>
            {err?.message}
          </p>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
                disabled={isLoading}
              />
              <label className="label">
                <Link
                  to={"/login"}
                  className="label-text-alt link link-hover mx-auto mt-4">
                  Have an Account? Login Here!
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
