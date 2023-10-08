import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { Button, Table } from "antd";
const ReqList = () => {
    const [data, setData] = useState([]);
const ColumnData = [];
const columns = [
{
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',

},
{
title: 'Blood Group',
dataIndex: 'BloodGroup',
key: 'BloodGroup',
},
{
title: 'Phone',
dataIndex: 'Phone',
key: 'Phone',
},
{
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
  },
{
title: 'Action',
dataIndex: 'Action',
key: 'Action',
}
]
    const getReqList = async () => {
        try {
            const { data } = await API.get("/blood-request/get-bloodRequest");
           // console.log(data);
          
                
                data.data.map(
                    (record) => {
                      ColumnData.push({
                      key: record._id,
                      Name: record.name,
                      BloodGroup: record.bloodGroup,
                      Phone: record.phone,
                      Date: moment(record.createdAt).format("DD/MM/YYYY hh:mm A"),
                      Action: <Button
                      className="bg-red-500 text-white"
                      onClick={() => handelDelete(record._id)}>Delete</Button>
                    })
                  }
                )
                setData(ColumnData);
          
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getReqList();
    }, []);
    const handelDelete = async (id) => {
        try {
          let answer = window.prompt(
            "Are You Sure Want To Delete This Request",
            "Sure"
          );
          if (!answer) return;
          const { data } = await API.delete(`/blood-request/delete-bloodRequest/${id}`);
          alert(data?.message);
          window.location.reload();
        } catch (error) {
          console.log(error);
          window.location.reload();
        }
      };
    return (
        <Layout>
           <Table 
            className="w-[90vw] bg-white mx-5  overflow-scroll"
           columns={columns} dataSource={data} />
        </Layout>

    )
}

export default ReqList