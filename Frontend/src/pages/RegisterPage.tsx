import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-[90vw] hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:ml-8">
          <h1 className="text-5xl font-bold">Join Us!</h1>
          <p className="py-6">Experience the Nike Shop experience today</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="email"
                placeholder="name"
                className="input input-bordered"
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
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
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
