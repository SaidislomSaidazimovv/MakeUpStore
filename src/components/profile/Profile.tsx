import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { auth, googleProvider, appleProvider } from "../../firebase/config";
import { setUser, setError, setLoading, logout } from "../../features/authSlice";
import { RootState } from "../../app/index";
import { useTranslation } from "react-i18next";
import PageTransition from "../PageTransition";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { t } = useTranslation();

  const handleGoogleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  const handleAppleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, appleProvider);
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  // LOGGED IN VIEW
  if (isAuthenticated && user) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center"
          >
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-rose-100"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {user.displayName}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{user.email}</p>

            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-50 transition font-medium"
            >
              {t("profile.logout")}
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  // LOGIN VIEW
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            {t("profile.title")}
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            {t("profile.subtitle")}
          </p>

          {error && (
            <div className="bg-red-50 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition mb-3 font-medium text-gray-700"
          >
            <img
              src="/images/google-icon.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {t("profile.googleLogin")}
          </motion.button>

          {/* Apple Login */}
          <motion.button
            onClick={handleAppleLogin}
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-black text-white hover:bg-gray-900 transition mb-6 font-medium"
          >
            <img
              src="/images/apple-icon.svg"
              alt="Apple"
              className="w-5 h-5 invert"
            />
            {t("profile.appleLogin")}
          </motion.button>

          {loading && (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
