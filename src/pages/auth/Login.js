import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div
        style={{
          boxShadow: "0px -10px 40px -10px rgba(0,0,0,0.75)",
        }}
        className="flex sm:flex-row relative flex-col h-screen gap-8 justify-center items-center bg-green-200 rounded-l-[75px] !rounded-b-none  ml-[2%]">
          <div className="">
           
          </div>
          <div className="sm:mr-8">
            <Form
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;