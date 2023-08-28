import React, { useEffect, useState, useRef } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
import {
  Card,
  Form as Fm,
  AutoComplete,
  Calendar,
  Button,
  Spin,
  Modal,
  Input,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { auth, app } from "../../../firebase.js";

import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import dayjs from "dayjs";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [divison, setDivison] = useState("");
  const [district, setDistrict] = useState();
  const [thana, setThana] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [weight, setWeight] = useState("");
  const [dateofbirth, setDateofbirth] = useState(() => dayjs(Date.now()));
  const [verificationId, setVerificationId] = useState(null);
 const [loading,setLoading]=useState(false)
 const [loading2,setLoading2]=useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  function initilizeCaptcha () {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recap', {
     
        app: app,
        size: 'invisible', // adjust as needed
        callback: () => {
         
        
        }
      })
      
    } catch (error) {
      console.log(error)
      
    }
   
    ;}
  useEffect(() => {
    initilizeCaptcha();
  }, []);

  // Initialize Firebase

  // Initialize Firebase Authentication and get a reference to the service

  const handleVerifyCode = async () => {
    await confirmationResult
      .confirm(verificationCode)
      .then((userCredential) => {
        setIsVerified(true)
        setLoading2(false)
        setOpen(false);
        const user = userCredential.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error verifying code:", error);
        setLoading2(false)
      });
  };
 
 
 
  const sendCode = async () => {
    setLoading(true)
    await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    )
      .then((res) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).

        // ...

        setConfirmationResult(res);
        console.log(JSON.stringify(res));
        
//         Modal.info({
         
//          closable:true,
//           title: "Verify Your Phone Number",
//           okButtonProps: { style: { display: "none" }},
         
// footer:null,
//           content: (
//             <div>
//               <p>
//                 A verification code has been sent to your phone number. Please
//                 verify your phone number to continue.
                
//               </p>
//               <Input 
//               value={verificationCode}
//               onChange={(e)=>setVerificationCode(e)}

//               />
//               <button
//                 onClick={()=>{
//                   setLoading2(true)
//                   res.confirm(verificationCode)
//                   .then((userCredential) => {
//                   setLoading2(false)
//                   setIsVerified(true)
//                   }).error((error)=>{
//                     setLoading2(false)
//                     console.warn(error)
//                   })
//                 }}
//                 className="bg-red-600 mt-2 w-full  cursor-pointer text-white p-2 rounded-md hover:bg-gray-600 focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out focus:scale-90 "
//               > {loading2 && <Spin
//                 indicator={
//                   <LoadingOutlined
//                     className="text-white "
//                     style={{ fontSize: 18 }}
//                     spin
//                   />
//                 }
//               />}
//                 {" "}
//                 Verify
//               </button>
//             </div>
//           ),
//         });
        setLoading(false)
        setOpen(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        setLoading(false)
      });
  };

  const options = [
    { value: "Rajshahi" },
    { value: "Dhaka" },
    { value: "Barisal" },
    { value: "Khulna" },
    { value: "Chittagong" },
    { value: "Sylhet" },
    { value: "Rangpur" },
    { value: "Mymensingh" },
  ];
  const optionDist = [
    [
      { value: "Barguna" },
      { value: "Barisal" },
      { value: "Bhola" },
      { value: "Jhalokati" },
      { value: "Patuakhali" },
      { value: "Pirojpur" },
    ],
    [
      { value: "Bandarban" },
      { value: "Brahmanbaria" },
      { value: "Chandpur" },
      { value: "Chittagong" },
      { value: "Comilla" },
      { value: "Cox's Bazar" },
      { value: "Feni" },
      { value: "Khagrachhari" },
      { value: "Lakshmipur" },
      { value: "Noakhali" },
      { value: "Rangamati" },
    ],
    [
      { value: "Dhaka" },
      { value: "Faridpur" },
      { value: "Gazipur" },
      { value: "Gopalganj" },
      { value: "Kishoreganj" },
      { value: "Madaripur" },
      { value: "Manikganj" },
      { value: "Munshiganj" },
      { value: "Narayanganj" },
      { value: "Narsingdi" },
      { value: "Rajbari" },
      { value: "Shariatpur" },
      { value: "Tangail" },
    ],
    [
      { value: "Bagerhat" },
      { value: "Chuadanga" },
      { value: "Jessore" },
      { value: "Jhenaidah" },
      { value: "Khulna" },
      { value: "Kushtia" },
      { value: "Magura" },
      { value: "Meherpur" },
      { value: "Narail" },
      { value: "Satkhira" },
    ],
    [
      { value: "Jamalpur" },
      { value: "Mymensingh" },
      { value: "Netrakona" },
      { value: "Sherpur" },
    ],
    [
      { value: "Bogra" },
      { value: "Chapainawabganj" },
      { value: "Joypurhat" },
      { value: "Naogaon" },
      { value: "Natore" },
      { value: "Pabna" },
      { value: "Rajshahi" },
      { value: "Sirajganj" },
    ],
    [
      { value: "Dinajpur" },
      { value: "Gaibandha" },
      { value: "Kurigram" },
      { value: "Lalmonirhat" },
      { value: "Nilphamari" },
      { value: "Panchagarh" },
      { value: "Rangpur" },
      { value: "Thakurgaon" },
    ],
    [
      { value: "Habiganj" },
      { value: "Moulvibazar" },
      { value: "Sunamganj" },
      { value: "Sylhet" },
    ],
  ];

  const onSelect = (data) => {
    console.log(optionDist);

    setDivison(data);
  };
  useEffect(() => {
    if (divison == "Rajshahi") {
      setDistrict(5);
    } else if (divison == "Barisal") {
      setDistrict(0);
    } else if (divison == "Chittagong") {
      setDistrict(1);
    } else if (divison == "Dhaka") {
      setDistrict(2);
    } else if (divison == "Khulna") {
      setDistrict(3);
    } else if (divison == "Mymensingh") {
      setDistrict(4);
    } else if (divison == "Rangpur") {
      setDistrict(6);
    } else if (divison == "Sylhet") {
      setDistrict(7);
    }
  }, [divison]);

  return (
    <Card >
      <Modal
      open={open}
       title= "Verify Your Phone Number"
       footer={null}
        closable={true}
        
       children={
          <div>
            <p>
              A verification code has been sent to your phone number. Please
              verify your phone number to continue. 
            </p>
            <Input
            onChange={(e)=>setVerificationCode(e.target.value)}
            />
            <button
              onClick={() => {
                setLoading2(true)
                handleVerifyCode();
              }}
              className="bg-red-600 mt-2 w-full  cursor-pointer text-white p-2 rounded-md hover:bg-gray-600 focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out focus:scale-90 "
            >{loading2 && <Spin
                              indicator={
                                <LoadingOutlined
                                  className="text-white "
                                  style={{ fontSize: 18 }}
                                  spin
                                />
                              }/>}
              {" "}
              Verify
            </button>
          </div>
        }

      />
      <fm
        className="flex flex-col justify-start h-full  gap-4"
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website,
              divison,
              district,
              thana,
              gender,
              occupation,
              weight,
              dateofbirth
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div  className="flex flex-row">
          <div  className="fm-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label  className="ml-2">
              Donor
            </label>
          </div>
         
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label  className="ml-2">
              Organisation
            </label>
          </div>
        </div>
        <div id='recap'></div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                 
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  
                  <button
                   disabled={isVerified}
                    onClick={() => {
                      sendCode();
                     // openModal();
                    }}
                    className="bg-red-600  cursor-pointer text-white p-2 rounded-md focus:scale-90  focus:bg-gray-800 transition-all flex flex-row justify-center items-center gap-2 ease-in-out  "
                  >{loading && <Spin
                    indicator={
                      <LoadingOutlined
                        className="text-white "
                        style={{ fontSize: 18 }}
                        spin
                      />
                    }
                  /> }
                    {" "}
                    {isVerified ? "Verified" : "Verify"}
                   
                  </button>
                  <InputType
                    labelText={"Gender"}
                    inputType={"text"}
                    name={"gender"}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <InputType
                    labelText={"Occupation"}
                    inputType={"text"}
                    name={"occupation"}
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                  <InputType
                    labelText={"Weight"}
                    inputType={"text"}
                    name={"weight"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  Date of Birth : {"  "}
                  <div style={{ width: 300, height: 360 }} className="flex h-full w-full rounded-lg border-2">
                    <Calendar
                      fullscreen={false}
                      onSelect={(value) => setDateofbirth(value)}
                      value={dateofbirth}
                      onPanelChange={(value, mode) => {
                        setDateofbirth(value);
                      }}
                    />
                  </div>
                  <div>
                    Division : {"  "}
                    <AutoComplete
                      options={options}
                      style={{ width: 200 }}
                      onSelect={onSelect}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      placeholder="Division"
                    />
                  </div>
                  {divison.length > 0 ? (
                    <div>
                      District : {"  "}
                      <AutoComplete
                        options={optionDist[district]}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        filterOption={(inputValue, option) =>
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        placeholder="District"
                      />
                      <InputType
                        labelText={"Thana"}
                        labelFor={"forPhone"}
                        inputType={"text"}
                        name={"thana"}
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>Select Division First!</p>
                  )}
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
        <button
            className="font-semibold border-2 p-1 my-2 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg "
            type="submit"
          >
            {submitBtn}
          </button>
          {formType === "login" ? (
            <p>
              Not registerd yet ? Register
              <Link
                to="/register"
                className="font-semibold border-2 p-1 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"
              >
                {" "}
                Here ! {" "}
              </Link>
            </p>
          ) : (
            <p>
              Already A User, Please
              <Link
                className="font-semibold border-2 p-1 px-2 focus:opacity-75 focus:bg-blue-200 transition-all border-blue-200 rounded-lg ml-2"
                to="/login"
              >
                {" "}
                Login ! {" "}
              </Link>
            </p>
          )}
          
        </div>
      </fm>
    </Card>
  );
};

export default Form;
