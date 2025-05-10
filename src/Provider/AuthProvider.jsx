import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };

    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
      setLoading(true);
      setUser(null);
      return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     if (currentUser) {
  //       //    get token and store client side.
  //       const userInfo = { email: currentUser.email };
  //       axiosPublic.post("/jwt", userInfo).then((res) => {
  //         //    console.log(res);
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //         }
  //       });
  //     } else {
  //       //  TODO: remove token(if token stored in the client side: local storage,  chasing, in memory)
  //       localStorage.removeItem("access-token");
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, [axiosPublic]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("current user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);


    const authInfo = {
      user,
      loading,
      createUser,
      signInUser,
      signOutUser,
      updateUserProfile,
      signInWithGoogle,
    };

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>


};

export default AuthProvider;