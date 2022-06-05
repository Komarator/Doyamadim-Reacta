import {Button, Card, Form, Input} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function PetAdd(props){
    const [file,setFile] = useState(null);
    const navigation = useNavigate();
    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("image",file);
        formData.append("animal_breed",values.animal_breed);
        formData.append("animal_name",values.animal_name);
        formData.append("description",values.description);
        formData.append("animal_age",values.animal_age);
        const headers = {
                "content-type":"multipart/form-data"
            }
        axios.post('http://localhost:8081/api/animals',formData,{headers}).then((response)=>{
           navigation('/');
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fileOnChange = (e) => {
        setFile(e.target.files[0]);
    }
    return(
        <div className='page-container'>
            <div className='card-container'>
                <Card title="Evcil Hayvan Ekle" className='list-card'>
                    <div className='form-container'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Hayvan Turu"
                                name="animal_breed"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Adi"
                                name="animal_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Yasi"
                                name="animal_age"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Aciklama"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your surname!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your surname!',
                                    },
                                ]}
                            >
                                <Input type='file' onChange={fileOnChange} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    )
}
