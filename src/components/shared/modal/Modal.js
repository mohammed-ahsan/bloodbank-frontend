import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";
import { Button,Modal as AntMod,Dropdown,Radio,Input } from 'antd';
import { useEffect } from "react";

const Modal = ({isModal,handleCancel,showModal,handleOk}) => {
  const [inventoryType, setInventoryType] = useState("in");
 
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
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
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
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
      <AntMod open={isModalOpen} 
      okText={<p className=" text-black">Submit</p>}
      okButtonProps={{className:"border-1 border-gray-300 rounded-lg",type:"default"}}
      onOk={
        ()=>{
          handleModalSubmit()
          handleOk()
        }
        } onCancel={handleCancel}
       title="Create New Record"

      >
        <div className="modal-dialog">
          <div className="flex flex-col gap-2">
            
            
              <div className="flex flex-row justify-between">
               
                <div className="flex flex-col gap-2">
                Record Type: &nbsp;
                  <Radio.Group

                    
                    onChange={(e) => 
                      {setInventoryType(e.target.value)
                      
                      }}
                    value={inventoryType}
                  

                  >
                    <Radio value={"in"}>In</Radio>
                    <Radio value={"out"}>Out</Radio>
                  </Radio.Group>
                
                  
                  
                </div>
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
              </Dropdown></div>
              </div>
              
              Donor Email
              <Input
                placeholder="********@email.com"
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />Quanitity (ML)
              <Input
                
                placeholder="quantity"
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            
           
          </div>
        </div>
      </AntMod>
    </>
  );
};

export default Modal;
