import { Button } from "../ui/button";
import { Github } from 'lucide-react';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const Login = () => {
  const handleLogin = () => {
    const redirectUri = 'http://localhost:3000/auth/callback'; // Your callback URL
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=repo,user,delete_repo`;
    window.location.href = url;
  };

  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <div className="bg-white w-96 py-16 px-10 flex flex-col items-center justify-center rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-10">Login</h2>
        <Button onClick={handleLogin}>
          <Github />
          Login with GitHub
        </Button>
      </div>
    </div>
  );
}

export default Login