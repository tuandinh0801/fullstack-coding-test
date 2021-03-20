import { useEffect, useCallback } from "react";

import { useAuthenticate } from "hooks/auth/useAuthenticate";
import { useRouter } from "next/router";

const ProtectRoute = ({ children }) => {
  const { user, isLoading } = useAuthenticate();

  const router = useRouter();

  const { pathname } = router;

  const checkProtectedRoute = useCallback((url) => ["/", "/blogs"].includes(url), []);
  const checkAuthRoute = useCallback((url) => ["/login", "/sign-up"].includes(url), []);

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      if (checkProtectedRoute(pathname)) {
        router.replace("/login");
      }
    } else {
      if (checkAuthRoute(pathname)) {
        router.replace('/')
      }
    }
  }, [pathname, user, isLoading]);

  return children;
};

export default ProtectRoute;
