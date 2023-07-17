import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext<{
  user: any;
  dispatch: React.Dispatch<any>;
} | null>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //validate jwt
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const token = JSON.parse(user).token;
      const fetchData = async (token: any) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const jsonData = await response.json();

          if (jsonData.userValid == true) {
            dispatch({
              type: "LOGIN",
              payload: JSON.parse(user),
            });
          } else {
            localStorage.removeItem("user");
          }
          return;
        } catch (error) {
          alert(error);
          console.error("Error fetching data:", error);
        }
      };
      fetchData(token);
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
