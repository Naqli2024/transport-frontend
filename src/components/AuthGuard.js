import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePageShow = (event) => {
      // Runs when page is restored from browser Back/Forward cache
      if (event.persisted) {
        const token = Cookies.get("token");

        if (!token && location.pathname.startsWith("/transport")) {
          navigate("/", { replace: true });
        }
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [navigate, location]);

  return null;
};

export default AuthGuard;
