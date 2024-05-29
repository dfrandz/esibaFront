
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSnapshot } from "valtio"
import state from '../../valtio/store';
import { BorderBeam } from "@/components/magicui/border-beam"
const Login = () => {

  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 6 characters long"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  
  type LoginFormInputs = z.infer<typeof loginSchema>;

  const onSubmit = (data: LoginFormInputs) => {
    state.userStore.login(data).then((res)=>{
      console.log("res ", res)
      if (res?.success) {
        navigate('/')
      }
    }).catch((error)=>{
      console.log("errpr ", error)
    })
  };

  console.log("state user", snap.userStore.isAuthenticated)
 
  
  return (
    <>
      <div className="bg-gray-500">
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        <div className="flex items-center justify-center h-screen">
          <div className="mx-auto grid w-[350px] gap-6 relative rounded-xl p-4 text-white border">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold relative z-20 bg-clip-text ">Login</h1>
              <p className="text-balance  relative z-20 bg-clip-text">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 relative z-20">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input className="relative "
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm relative z-20  ">
              Don&apos;t have an account?{" "}
              <Link to="#" className="underline">
                Sign up
              </Link>
            </div>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </>
  );

}

export default Login