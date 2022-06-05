import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes, NavLink, useNavigate, Link
} from "react-router-dom";
import "antd/dist/antd.css";
import Home from './pages/Home';
import Pets from './pages/Pets';
import Users from './pages/Users';
import {Layout,Menu,Dropdown,Space,Avatar} from "antd";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PetDetail from "./pages/PetDetail";
import PetAdd from "./pages/PetAdd";
import PetUpdate from "./pages/PetUpdate";
import {DownOutlined,UserOutlined} from "@ant-design/icons";
const {Header,Footer} = Layout;
const App = (props) => {
    let routes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "pets", element: <Pets /> },
        { path: "pets/add", element: <PetAdd /> },
        { path: "pets/update/:id", element: <PetUpdate /> },
        { path: "pets/:id", element: <PetDetail /> },
        { path: "users", element: <Users /> },

    ]);
    return routes;
};
const PublicPages = () => {
    let routes = useRoutes([
        { path: "/", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },

    ]);
    return routes;
}


const AppWrapper = () => {
    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
        window.location.reload();
    }
    const menu = (
        <Menu
            items={[
                {
                    label: <Link to='/'>Cikis</Link>,
                    key: '0',
                    onClick:()=>{ handleLogout()}
                },
            ]}
        />
    );
    if (localStorage.getItem('jwt_token')){
        return (
            <Router>
                <Layout className="layout">
                    <Header className='layout-header'>
                        <div className="logo" />
                        <Menu
                            className='main-menu'
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}>
                            <Menu.Item key={1} path='/'><NavLink to={'/'}>AnaSayfa</NavLink></Menu.Item>
                            <Menu.Item key={2} path='/pets'><NavLink to={'/pets'}>Evcil Hayvan</NavLink></Menu.Item>
                            <Menu.Item key={3} path='/users'><NavLink to={'/users'}>Kullanicilar</NavLink></Menu.Item>
                        </Menu>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    <Avatar icon={<UserOutlined />} />
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>                    </Header>
                    <App />
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Router>
        );
    }else {
        return (
            <Router>
                <Layout className="layout">
                    <PublicPages />
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Router>
        );
    }

};

export default AppWrapper;
