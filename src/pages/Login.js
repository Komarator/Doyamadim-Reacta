import {Form,Input,Button,Card} from "antd";
import axios from "axios";
import "./Login.css";
import {Link} from "react-router-dom";
export default function Login(){
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('http://localhost:8081/giris',values).then(response => {
            localStorage.setItem('jwt_token',response.data.token);
            localStorage.setItem('user_info',JSON.stringify(response.data.user));
            window.location.reload();
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return(
        <div className='public-container'>
            <div className='login-container'>
            <Card title="Barinak" style={{ width: 600 }}>
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
                            label="Username"
                            name="username"
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
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Link to='/register'>Kayit Ol</Link>
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
