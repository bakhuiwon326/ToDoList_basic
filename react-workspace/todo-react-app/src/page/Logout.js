import React from "react";
import { Link } from "react-router-dom";

function Logout({login, setLogin}){
    setLogin(false);
    return(
        <div>
            <h5>로그아웃되었습니다!</h5>
            <Link to='/login'> <p>로그인하러가기</p> </Link>
        </div>
    )
}

export default Logout;