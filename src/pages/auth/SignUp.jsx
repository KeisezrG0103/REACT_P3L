import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerPelanggan } from "../../api/auth/auth_query";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../assets/logo.png";
import { Button } from "flowbite-react";

const SignUp = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nama, setNama] = useState("")

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      if (password !== confirmPassword) {
        return toast.error('Password tidak sama', { duration: 3000 })
      }
      const data = { Email: email, Password: password, Nama: nama }
      const res = await registerPelanggan(data);

      if (res.success === true) {
        toast.success('Berhasil Mendaftar', { duration: 3000 })
        setTimeout(() => {
          navigate('/auth/signin')
        }, 2000);
      } else {
        return toast.error('Gagal Mendaftar', { duration: 3000 })
      }
    } catch (error) {
      toast.error('Gagal Mendaftar', { duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Toaster></Toaster>
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
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            placeholder="Type your email here"
            className="input input-bordered w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold"> Confirm Password</span>
          </div>
          <input
            type="password"
            placeholder="Type your password here"
            className="input input-bordered w-full"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="mt-4">
          <Button isProcessing={isLoading} className="btn btn-primary w-full text-white" onClick={handleSubmit}>Sign Up</Button>
        </div>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" relative="path" className="text-primary">
            Sign In
          </Link>
        </div>
    </div>
  );
};

export default SignUp;
