import React, { useEffect, useState } from "react";
import { call } from "../service/ApiService";

function Login(){
    const [input, setInput] = useState({email: "", password: ""});
    const loginBtn = () => {
        call("/auth/signin", "POST", input).then((res) => console.log(res));
    };
    const login_emailHandler = (e) =>{
        setInput({
            ...input,
            email:e.target.value
        })
    }
    const login_passwordlHandler = (e) => {
        setInput({
            ...input,
            password:e.target.value
        })
    };
    
    return(
        <>
            <div>로그인 페이지입니다</div>
            <div>login-email: <input type="text" name="login-email" onChange={login_emailHandler} /></div>
            <div>login-password: <input type="text" name="login-password" onChange={login_passwordlHandler} /></div>
            <button onClick={loginBtn}>로그인</button>
        </>
    )
}

export default Login;