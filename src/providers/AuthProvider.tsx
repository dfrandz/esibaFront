import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { deleteToken, getToken } from "../helpers/myfunc";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const is_auth = deleteToken();
        if (!is_auth) {
            console.log("User not authenticate");
            navigate("/login")
        }
        const token = getToken();
        if (token == null) {
            console.log("User not authenticate");
            navigate("/login");
        }
        setTimeout(()=>{
            setIsLoading(false);
        },2000)
        setInterval(() => {
            
        }, 4000);
    }, []);


    return (
        <>
            <Loading isLoading={isLoading} children={children} />
        </>
    );
}

export default AuthProvider;