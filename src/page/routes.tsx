import React from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import DetailPage from './details/Details';
import HomePage from './home/Home';
import ProfilePage from './profile/Profile';

import { Layout, Menu, Image } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    CodeSandboxOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryPage from './category/CategoryPage';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const initialState = {
    isCollapsed: false,
    keySelect: 1,
};
function RouterPage() {
    const [{ isCollapsed }, setState] = React.useState(initialState);
    let navigate = useNavigate();
    const onCollapse = (collapsed: any) => {
        setState((pre) => ({
            ...pre,
            isCollapsed: collapsed,
        }));
    };
    const logout = () => {
        sessionStorage.clear();

        window.location.href = '/';
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
                <div
                    className="logo"
                    onClick={() => {
                        navigate('/', { replace: true });
                    }}
                >
                    <Image
                        alt="logo"
                        preview={false}
                        src={
                            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                        }
                        width={50}
                    />
                    {/* {isCollapsed ? null : <p>sdfsdf</p>} */}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="">Option 1</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to="/Narwhal">Option 2</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        icon={<CodeSandboxOutlined />}
                        title="Hàng Hóa"
                    >
                        <Menu.Item key="3">
                            <Link to="/Category">Danh mục</Link>
                        </Menu.Item>
                        <Menu.Item key="4">Nguyên liệu</Menu.Item>
                        <Menu.Item key="5">Thiết lập giá</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        <Link to="/Profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="10"
                        style={{ color: 'red' }}
                        icon={<LoginOutlined />}
                        onClick={logout}
                    >
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0, backgroundColor: 'gray' }}
                />
                <Content style={{ margin: '0 16px' }}>
                    <Routes>
                        <Route path="" element={<HomePage />} />
                        <Route path="Narwhal" element={<DetailPage />} />
                        <Route path="Profile" element={<ProfilePage />} />
                        <Route path="Category" element={<CategoryPage />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}
export default RouterPage;
