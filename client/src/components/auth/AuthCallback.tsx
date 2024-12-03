import { useEffect } from "react";
import { GithubApi } from "../../api/git";
import { useSearchParams } from "react-router";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    const fetchAccessToken = async () => {
      if (code) {
        try {
          await GithubApi.auth(code)

          window.location.href = 'http://localhost:3000/'
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      }
    };

    fetchAccessToken();
  }, [searchParams]);

  return (
    <div>Loading...</div>
  )
}

export default AuthCallback