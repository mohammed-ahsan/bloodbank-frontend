import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";
import { Button,Modal as AntMod,Dropdown,Radio,Input,AutoComplete,ConfigProvider, Space, Calendar, DatePicker } from 'antd';
import { useEffect } from "react";
import dayjs from "dayjs";
const Modal = ({isModal,handleCancel,showModal,handleOk}) => {
  const [inventoryType, setInventoryType] = useState("in");
 const [Name,setDonorName] = useState("")
  const [quantity, setQuantity] = useState(0);
  const [phone, setPhone] = useState("");
  const [divison,setDivison] = useState("")
  const [district,setDistrict] = useState()
 const [thana,setThana] = useState("")
 const [lastDonateMonth,setLastDonateMonth] = useState('')
  const options = [
    { value: 'Rajshahi'},
    { value: 'Dhaka' },
    { value: 'Barisal' },
    { value: 'Khulna' },
    { value: 'Chittagong' },
    { value: 'Sylhet' },
    { value: 'Rangpur' },
    { value: 'Mymensingh' },

  ];
  const optionDist = [
     [{ value:"Barguna"} ,  { value:"Barisal"} ,        { value:"Bhola"},   { value: "Jhalokati"},  { value:"Patuakhali"}, { value:"Pirojpur"}],
    [{ value:"Bandarban"} ,{ value:"Brahmanbaria"} ,  { value: "Chandpur"}, { value:"Chittagong"},{ value: "Comilla"},   { value: "Cox's Bazar"},{ value:"Feni"},     { value:"Khagrachhari"},{ value:"Lakshmipur"},{ value: "Noakhali"}, { value:"Rangamati"}],
      [{ value:"Dhaka"} ,    { value:"Faridpur"} ,      { value: "Gazipur"}, { value: "Gopalganj"}, { value: "Kishoreganj"},{ value:"Madaripur"}, { value: "Manikganj"},{ value:"Munshiganj"},  { value:"Narayanganj"},{ value:"Narsingdi"},{ value:"Rajbari"},{ value:"Shariatpur"},{ value:"Tangail"}],
     [{ value:"Bagerhat"} , { value:"Chuadanga"} ,    { value:  "Jessore"}, { value: "Jhenaidah"}, { value: "Khulna"},    { value: "Kushtia"},    { value:"Magura"},  { value: "Meherpur"},   { value: "Narail"},   { value:  "Satkhira"}],
   [{ value:"Jamalpur"} , { value: "Mymensingh"} ,     { value:"Netrakona"},{ value:"Sherpur"}],
      [{ value:"Bogra"},    { value:"Chapainawabganj"},{ value:"Joypurhat"},{ value:"Naogaon"},    { value:"Natore"},     { value:"Pabna"},      { value:"Rajshahi"}, { value:"Sirajganj"}],
      [{ value:"Dinajpur"} , { value:"Gaibandha"} ,      { value:"Kurigram"}, { value:"Lalmonirhat"},{ value:"Nilphamari"}, { value:"Panchagarh"}, { value:"Rangpur"},  { value:"Thakurgaon"}],
       [{ value:"Habiganj"} , { value:"Moulvibazar"} ,   { value: "Sunamganj"},{ value:"Sylhet"}]
  ]
  
  
  const onSelect = (data) => {
    console.log(optionDist)
    
    setDivison(data)
   
    
   
  
    
   
    
  };
  useEffect(()=>{
    
    if(divison == "Rajshahi")
    {
      setDistrict(5)
    }
    else if(divison == "Barisal"){
setDistrict(0)
    }
    else if(divison == "Chittagong"){
      setDistrict(1)
          }
          else if(divison == "Dhaka"){
            setDistrict(2)
                }
                else if(divison == "Khulna"){
                  setDistrict(3)
                      }
                      else if(divison == "Mymensingh"){
                        setDistrict(4)
                            }
                            else if(divison == "Rangpur"){
                              setDistrict(6)
                                  }
                                  else if(divison == "Sylhet"){
                                    setDistrict(7)
                                        }
  },[divison])
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = [{
    key: '1',
    label: "O+",
  },
  {
    key: '2',
    label:"O-",
  },
  {
    key: '3',
    label:'A+',
  }
,
{
  key: '4',
  label:'A-',


},
{
  key: '5',
  label:'B+',

},
{
  key: '6',
  label:'B-',

},
{
  key: '7',
  label:'AB+',

},
{
  key: '8',
  label:'AB-',
},


]

const [bloodGroup, setBloodGroup] = useState(items[0].label);
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !Name || !phone || !lastDonateMonth || !divison || !district || !thana) {
        return alert("Please Provide All Fields");
      }
      const postObject = {
        phone,
        Name,
        inventoryType,
        bloodGroup,
        lastDonateMonth,
        divison,
        district,
        thana,
      };  
      if (user?.role === "donar") {
        postObject.donar = user?._id;
      }
      if (user?.role === "organisation") {
        postObject.organisation = user?._id;
      }
      if(user?.role === "admin"){
        postObject.organisation = user?._id;
      }
      if(inventoryType === "out" && user?.role === "donar"){
        return alert("Donar Can't Create Out Record")
      }

      const { data } = await API.post("/inventory/create-inventory", postObject);
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };
  useEffect(() => {
    setIsModalOpen(isModal);
  }, [isModal]);
  // handle modal data
  

  return (
    <>
      {/* Modal */}
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: ' #dc2626',
            borderRadius: 10,
    
            // Alias Token
            
          },
        }}
      >
        <Space
        direction="vertical"
        >
      <AntMod open={isModalOpen} 
      okText={<p className=" text-black">Submit</p>}
      okButtonProps={{className:"border-1 border-gray-300 rounded-lg",type:"default"}}
      onOk={
        ()=>{
          handleModalSubmit()
          handleOk()
        }
        } onCancel={handleCancel}
       title="Add New Donor"

      >
        <div className="modal-dialog">
          <div className="flex flex-col gap-2">
            
            
              <div className="flex flex-row ">
               
               
                <div>
                Blood Group: &nbsp;
                <Dropdown
                
               
                menu={{items,
                  selectable: true,
                  defaultSelectedKeys: ['1'],
                  onSelect: ({ item, key, keyPath, selectedKeys, domEvent  }) => {
                    
                    setBloodGroup(items[key-1].label)
                    console.log(items[key-1].label)
                  },

                }}
                
                //onChange={(e) => setBloodGroup(e.target.value)}
              >
               <Button>{bloodGroup}</Button> 
              </Dropdown></div><p className="text-red-600 mx-2 font-bold"> * </p>
              </div>
            <p className="flex"> Name <p className="text-red-600 mx-2 font-bold"> * </p></p> 
              <Input

                placeholder="Name"
                inputType={"text"}
                value={Name}
                onChange={(e) => setDonorName(e.target.value)}
              />
              
              <p className="flex"> Donor Phone Number: <p className="text-red-600 mx-2 font-bold"> * </p></p> 
              <Input
                placeholder="01*********"
                inputType={"phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
               <p className="flex"> Last Donate Date:</p> 
              
              <DatePicker
              value={lastDonateMonth}
              onChange={(e) => setLastDonateMonth(e)}
              />
             
            <div>
                  
                  <p className="flex"> Division:  {"  "} <p className="text-red-600 mx-2 font-bold"> * </p></p> 
                   <AutoComplete
                   
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Division"
      />
                  </div>
                  
                 {divison.length>0?<div>
                  <div className="flex gap-2 items-center flex-row">
                  District:  {"  "}
                  <p className="text-red-600 mx-2 font-bold"> * </p> 
                   <AutoComplete
                   
        options={optionDist[district]}
        style={{ width: 200 }}
        onSelect={onSelect}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="District"
      />
      
      Thana: 
      <p className="text-red-600 mx-2 font-bold"> * </p>
       <Input
       className="w-[30%]"
                placeholder="Thana"
                inputType={"text"}
                value={thana}
                onChange={(e) => setThana(e.target.value)}
              /></div>
                  </div>:<p>Select Division First!</p> } 
           
          </div>
        </div>
      </AntMod>
      </Space>
  </ConfigProvider>
    </>
  );
};

export default Modal;
