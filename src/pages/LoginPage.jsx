import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../assets/logo.svg";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <main className="flex items-center overflow-hidden">
      <div className="w-5/6 p-2 hidden sm:block h-screen">
        <img
          src="https://madrid-modern.myshopify.com/cdn/shop/files/image_25.jpg?v=1725275161&width=3000"
          className="w-full h-full rounded-xl object-cover"
          alt=""
        />
      </div>
      <div className="w-7/12 h-screen sm:h-auto  flex flex-col space-y-20 items-center justify-center">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo company"
            className="w-[120px] sm:max-w-sm"
          />
        </Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} action="">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-3xl">Welcome Back.</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="pl-10"
                            placeholder="Enter your email"
                          />
                          <IoMailOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="pl-10"
                            placeholder="Enter your password"
                          />
                          <IoLockClosedOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />

                          {showPassword ? (
                            <IoEyeOffOutline
                              onClick={handleShowPassword}
                              className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                            />
                          ) : (
                            <IoEyeOutline
                              onClick={handleShowPassword}
                              className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="showPassword" />
                    <Label htmlFor="showPassword">Remember me</Label>
                  </div>
                  <div>
                    <Link
                      className="text-sm text-muted-foreground"
                      to="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    className="w-full"
                    variant="default"
                  >
                    Login
                  </Button>
                  <Button variant="outline">Sign Up</Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default LoginPage;
