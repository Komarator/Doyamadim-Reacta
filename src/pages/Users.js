import {Button, Card, Modal, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

export default function Users(props){
    const [users,setUsers] = useState([]);
    useEffect(()=> {
        getUsers();
    },[]);

    const getUsers = () => {
        axios.get('http://localhost:8081/api/users').then(response => {
            setUsers(response.data);
        })
    }
    const removeUser = (id) => {
        Modal.confirm({
            title: 'Uyari',
            icon: <ExclamationCircleOutlined />,
            content: 'Uye silmek istediginizden emin misiniz ?',
            okText: 'Evet',
            cancelText: 'Hayir',
            onOk:()=>{
                axios.delete(`http://localhost:8081/api/users/${id}`).then(response => {
                    window.location.reload();
                });
            }
        });
    }
    const columns = [
        {
            title: 'Kullanici Adi',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Adi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'adress',
            key: 'adress',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Yetki',
            dataIndex: 'user_level',
            key: 'user_level',
            render: (text) => text === 2 ?  <Tag color="cyan">Kullanici</Tag> :  <Tag color="green">Admin</Tag>,
        },
        {
            title: 'Islem',
            key: 'islem',
            render: (text,data) => <Button onClick={()=>{removeUser(data.id)}} icon={<DeleteOutlined />} title='Sil' />
        }
    ];

    return(
        <div className='page-container'>
            <div className='card-container'>
                <Card title="Kullanicilar" className='list-card'>
                    <Table rowKey={item => item.id} dataSource={users} columns={columns} />
                </Card>
            </div>
        </div>
    )
}
