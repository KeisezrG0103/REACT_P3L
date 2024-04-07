import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginKaryawan, loginPelanggan } from "../../api/auth/auth_query";
import useKaryawanStore from "../../stores/stores_auth/karyawan_store";
import useCustomerStore from "../../stores/stores_auth/customer_store";
import toast from "react-hot-toast";
import Logo from "../../assets/logo.png";
import { useMutation } from "react-query";



const SignIn = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation = useMutation(loginKaryawan);
  const mutationPelanggan = useMutation(loginPelanggan);


  const navigate = useNavigate();
  const setKaryawan = useKaryawanStore((state) => state.setKaryawan);
  const state = useKaryawanStore((state) => state.karyawan);

  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const stateCustomer = useCustomerStore((state) => state.customer);

  const location = useLocation();

  const isKaryawan = location.pathname.includes("signinKaryawan");


  const onSubmit = (data) => {
    if (isKaryawan) {
      mutation.mutate(data, {
        onSuccess: (res) => {
          setKaryawan(res.data);
          console.log(state.Nama);
          toast.success("Login Berhasil");

          if(res.data.role === "Admin") {
            navigate("/dashboard/Admin");
          }
          if(res.data.role === "MO") {
            navigate("/dashboard/MO");
          }
          if(res.data.role === "Owner") {
            navigate("/dashboard/Owner");
          }
        },
        onError: (err) => {
          console.log(err);
        }
      });
    } else {
      
      mutationPelanggan.mutate(data, {
        onSuccess: (res) => {
          setCustomer(res.data);
          console.log(stateCustomer.Nama);
          toast.success("Login Berhasil");
          navigate("/dashboard/Customer");
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
  };

  return (
    <div>
      

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-4 w-96 mx-auto mt-20"
      >
        <div className="text-center">
          <img src={Logo} alt="logo" className="w-40 mx-auto" />
        </div>
        <div className="text-2xl font-bold text-center mb-4">Sign In</div>
        {isKaryawan && (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Username</span>
            </div>
            <input
              type="text"
              placeholder="Type your Username here"
              className="input input-bordered w-full"
              {...register("Nama", { required: true })}
              required
            />
          </label>
        )}

        {!isKaryawan && (
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Email</span>
            </div>
            <input
              type="text"
              placeholder="Type your email here"
              className="input input-bordered w-full"
              {...register("Email", { required: true })}
              required
            />
          </label>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            {...register("Password", { required: true })}
            required
          />
        </label>
        <div className="mt-4">
          <button className="btn btn-primary w-full text-white">
          {mutation.isLoading ? (<span className="loading loading-dots loading-md"></span>) : ("Sign In")}

          </button>
        </div>

        <div className="text-center mt-4">
          Dont have an account?{" "}
          <Link to="/auth/signup" relative="path" className="text-primary">
            Sign Up
          </Link>
        </div>

        <div className="text-right mt-4">
          {isKaryawan && (
            <Link to="/auth/signin" relative="path" className="text-primary">
              SignIn Customer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}

          {!isKaryawan && (
            <Link
              to="/auth/signinKaryawan"
              relative="path"
              className="text-primary"
            >
              SignIn Karyawan
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
