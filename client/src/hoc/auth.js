import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
//SpecificComponent : 검사하는 컴포넌트
//option : null  => 아무나 출입이 가능한 페이지
//         true  => 로그인한 유저만 출입이 가능한 페이지
//         false => 로그인한 유저는 출입이 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option === true) {
            props.history.push("/sign-in");
          }
        } else {
          //로그인 한 상태
          if (adminRoute === true && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            //로그인한 사람이 못들어가는 페이지 로그인,회원가입
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
