import React from 'react'
import { Layout, Avatar, Popover, Button } from 'antd'

const { Header } = Layout;

const SearchPageHeader = (props) => {

    const userLogo = props.user ? props.user.charAt(0) : 'U';
    const logoStyle = {
        margin: '12px',
        float: 'right',
        backgroundColor: '#ffbf00',
        fontSize: '1.4em'
    }

    const content = (
        <div>
            <Button onClick={props.doLogout} type="link" block>Logout</Button>
        </div>
    );

    return (
        <Header className="header" >
            <Popover placement="bottom" trigger="click" content={content} title={props.user}>
                <Avatar size="large" style={logoStyle}>
                    {userLogo.toUpperCase()}
                </Avatar>
            </Popover>
        </Header>
    );
}

export default SearchPageHeader;