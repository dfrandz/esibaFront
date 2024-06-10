
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import logo from '/assets/images/95.jpg';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import state from '../../valtio/store';
import { useSnapshot } from "valtio";
import { useState } from "react";
const Login = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 6 characters long"),
  });

  type LoginFormInputs = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    setLoading(true)
    state.userStore.login(data).then((res)=>{
      if (res?.success) {
        // navigate("/")
        toast.success("Logged in")    
        window.location.href = "/"
      }else{
        setLoading(false)
        toast.error(res.message)
      }
    }).catch((error)=>{
      setLoading(false)
      console.log("errpr ", error)
    })
    
  };

  console.log("state user", snap.userStore.isAuthenticated)
  console.log("loading", loading)

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[640px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@mail.com"
                {... register("email")}
                
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
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>
            {
              !loading && (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )
            }
          </form>

        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src={logo} alt="Image"
          width="1920"
          height="1080" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default Login
