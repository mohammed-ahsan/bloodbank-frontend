import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div  style={{
          boxShadow: "0px -10px 40px -10px rgba(0,0,0,0.75)",
        }}
        className="flex sm:flex-row relative flex-col h-full py-[120px] gap-8 justify-center items-center bg-green-200 rounded-l-[75px] !rounded-b-none  ml-[2%]">
         
          <div className="">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
