import {Button,Card,Modal} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import "./Pets.css";
import {useEffect, useState} from "react";
import axios from "axios";
import PetCardItem from "../components/PetCardItem";
import {Link} from "react-router-dom";
import {ExclamationCircleOutlined} from "@ant-design/icons";
export default function Pets(){
    const [data,setData] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    useEffect(()=>{
        getPets();
    },[]);
    const getPets = () => {
        axios.get('http://localhost:8081/api/animals').then(response => {
            setData(response.data);
        });
    }
    const removePet = (id) => {
        Modal.confirm({
            title: 'Uyari',
            icon: <ExclamationCircleOutlined />,
            content: 'Hayvan silmek istediginizden emin misiniz ?',
            okText: 'Evet',
            cancelText: 'Hayir',
            onOk:()=>{
                axios.delete(`http://localhost:8081/api/animals/${id}`).then(response => {
                    window.location.reload();
                });
            }
        });

    }
    return(
        <div className='page-container'>
            <div className='card-container'>
            <Card title="Evcil Hayvanlar" extra={<Link to={'/pets/add'}><Button type="primary" icon={<PlusOutlined/>} title='Ekle' /></Link>} className='list-card'>
                <div className='pet-container'>
                {data.length > 0  ?  data.map((item,i) => <PetCardItem key={i} data={item} userLevel={userInfo.user_level} removeItem={removePet} />):(<h4>Goruntulenecek evcil hayvan bulunmamaktadir</h4>)}
                </div>
            </Card>
            </div>
        </div>
    )
}
