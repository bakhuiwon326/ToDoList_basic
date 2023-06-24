import React, { useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { Link } from "react-router-dom";

function SignUp(){
    const [user, setUser] = useState({email: "", username: "", password: ""});
    const [check, setCheck] = useState(false); // 회원가입 완료 용

    const signupBtn = () => {
        call("/auth/signup", "POST", user).then((res) => console.log(res + "님 회원가입 완료되었습니다"));
        // 회원가입 상태 여기서! 우선 가입 완료만 만ㄷ르어 놓음.
        setCheck(true);
    };

    const emailHandler = (e) =>{
        setUser({
            ...user,
            email:e.target.value
        })
    }
    
    const usernameHandler = (e) =>{
        setUser({
            ...user,
            username:e.target.value
        })
    }

    const passwordHandler = (e) =>{
        setUser({
            ...user,
            password:e.target.value
        })
    }
    
    return(
        <>
            <div>회원가입 페이지입니다.</div>
            {
                check === false?
                <>
                    <div>email: <input type="text" name="email" onChange={emailHandler} /></div>
                    <div>username: <input type="text" name="username" onChange={usernameHandler} /></div>
                    <div>password: <input type="text" name="password" onChange={passwordHandler} /></div>
                    <button onClick={signupBtn}>회원가입</button>
                </>
                :
                <>
                    {user.username}님 회원가입 완료되었습니다.
                    <Link to='/login'>로그인하러 가기</Link>
                </>

            }
        </>
    )
}

export default SignUp;