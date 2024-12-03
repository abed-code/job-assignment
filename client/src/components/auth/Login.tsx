const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const Login = () => {
  const handleLogin = () => {
    const redirectUri = 'http://localhost:3000/auth/callback'; // Your callback URL
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=repo,user,delete_repo`;
    window.location.href = url;
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}

export default Login