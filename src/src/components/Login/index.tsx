import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";
import { useState } from "react";

// @ts-expect-error -- todo
const Form = ({ setIsLogged }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // @ts-expect-error -- todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() == "") {
      console.log("Password can't be empty!");
      setErrorMsg("Password can't be empty!");
      setError(true);
    }
    // console.log(password);

    // @ts-expect-error -- todo
    const credentials = getCredentials();
    if (!credentials) {
      console.log("credentials db is empty");
      setErrorMsg("Credentials db is empty!");
      setError(true);
      return;
    }

    // @ts-expect-error -- todo
    if (!exists(password, credentials.secrets)) {
      console.log("Wrong password!");
      setErrorMsg("Wrong password!");
      setError(true);
      return;
    }

    setIsLogged(true);
    setError(false);
    setErrorMsg("");
  };
  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            className="border-zinc-300"
            id="password"
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="text-red-700 text-xs">{errorMsg}</span>}
        </div>
        <Button type="submit" className="w-full bg-zinc-800 text-white">
          Login
        </Button>
      </div>
    </form>
  );
};

// @ts-expect-error -- todo
export function Login({ setIsLogged }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 absolute w-full h-screen z-50 bg-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Sticky Note
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Form setIsLogged={setIsLogged} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img src={loginBg} alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
