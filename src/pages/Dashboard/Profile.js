import {Form , Button,ConfigProvider,Space,Input, AutoComplete,Calendar, Radio} from 'antd';
import React, { useCallback,useEffect,useState } from 'react';
import Layout from "./../../components/shared/Layout/Layout";
import dayjs from 'dayjs';
import API from '../../services/API';
import { useSelector } from 'react-redux';
const Profile = () => {
    const {user} = useSelector(state=>state.auth);
    const [divison, setDivison] = useState("");
    const [district, setDistrict] = useState();
    const [dateOfBirth, setDateOfBirth] = useState(dayjs(user?.dateOfBirth));
    const onSelect = (data) => {
        //console.log(optionDist);
    
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
      const options = [
        { value: "Barisal" },
        { value: "Chittagong" },
        { value: "Dhaka" },
       
        { value: "Khulna" },
        { value: "Mymensingh" },
        { value: "Rajshahi" },
        { value: "Rangpur" },
        { value: "Sylhet" },
      
        
       
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
   
    return (
        <Layout><div className='min-h-screen mt-[80px]  m-6 flex flex-col justify-center items-center'>
            <Form>
                <Form.Item
                label='Name'
                name='name'
                
                >
                    <Input
                    defaultValue={user?.name}
                    />
                </Form.Item>
                <Form.Item
                label='Email'
                name='email'
               
                >
                    <Input
                    defaultValue={user?.email}
                    />
                </Form.Item>
                <Form.Item
                label='Phone'
                name='phone'
              
                >
                    <Input
                    defaultValue={user?.phone}
                    />
                </Form.Item>
                <Form.Item
                label='Password'
                name='password'
               
                >
                    <Input
                    defaultValue={"********"}
                    />
                </Form.Item>
                <Form.Item
                label='Address'
                name='address'
            
                >
                    <Input
                    defaultValue={user?.address}
                    />
                </Form.Item>
                <Form.Item
                label='Divison'
                name='divison'
             
                >
                   <AutoComplete
                    className="w-[30%]"
                      options={options}
                      
                      onSelect={onSelect}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      defaultValue={options[user?.district].value}
                    />
                </Form.Item>
                <Form.Item
                label='District'
                name='district'
              
                >
                     <AutoComplete
                    className="w-[30%]"
                      
                        options={optionDist[district]}
                        filterOption={(inputValue, option) =>
                            option.value

                                .toUpperCase()  
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        defaultValue={user?.divison}
                    />
                </Form.Item>
                <Form.Item
                label='Thana'
                name='thana'
               
                >
                    <Input
                    defaultValue={user?.thana}
                    />
                </Form.Item>
                <Form.Item
                label='Weight'
                name='weight'
              
                >
                    <Input
                    defaultValue={user?.weight}
                    />
                </Form.Item>
                <Form.Item
                label='Gender'
                name='gender'
                
                >
                    <Radio.Group
                    defaultValue={user.gender}
                    >
                        <Radio value={"m"}>Male</Radio>
                    <Radio value={"f"}>Female</Radio>
                    <Radio value={"o"}>Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                label='Date of birth'
                name='dateOfBirth'
               
                >
                    <Calendar
                    
                    fullscreen={false}
                    
                    defaultValue={dateOfBirth}

                    />
                </Form.Item>

                    



                
            </Form>
                    <Button
                   className='bg-red-600'
                    type="primary">Update</Button></div>
        </Layout>
             
    );
}

export default Profile;