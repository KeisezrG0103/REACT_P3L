import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
const SignIn = () => {
  return (
    <div>
      <form action="">
        <div className="text-center">
          <img src={Logo} alt="logo" className="w-40 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-center mb-4">Sign Up</div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Nama</span>
          </div>
          <input
            type="text"
            placeholder="Type your name here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="type your email here"
            placeholder="Type your email here"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="text"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold"> Confirm Password</span>
          </div>
          <input
            type="text"
            placeholder="Type your password here"
            className="input input-bordered w-full"
          />
        </label>

        <div className="mt-4">
          <button className="btn btn-primary w-full text-white">Sign Up</button>
        </div>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" relative="path" className="text-primary">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
