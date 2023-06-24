import React from "react";
import { Link } from "react-router-dom"

function Header(){
    return(
        <>
        <h5> header 부분</h5>
        <Link to='/login'>
            <p>로그인</p>
        </Link>
        <Link to='/signup'>
            <p>회원가입</p>
        </Link>
        <Link to='/'>
            <p>메인화면</p>
        </Link>
        </>
    )
}

export default Header;