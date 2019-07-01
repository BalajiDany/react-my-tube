import React from 'react'
import { Layout, Avatar, Popover, Button } from 'antd'

const { Header } = Layout;

const SearchPageHeader = (props) => {

    const userLogo = props.user ? props.user.charAt(0) : 'U';
    const avathaStyle = {
        margin: '12px',
        float: 'right',
        backgroundColor: '#ffbf00',
        fontSize: '1.4em'
    }

    const logoStyle = {
        display: 'inline',
        float: 'left',
        fontSize: '1.6em',
        color: '#f4f4f4'
    }

    const content = (
        <div>
            <Button onClick={props.doLogout} type="link" block>Logout</Button>
        </div>
    );

    return (
        <Header className="header" >
            <h1 className="logo" style={logoStyle}>
                my-tube
            </h1>
            <Popover placement="bottom" trigger="click" content={content} title={props.user}>
                <Avatar size="large" style={avathaStyle}>
                    {userLogo.toUpperCase()}
                </Avatar>
            </Popover>
        </Header>
    );
}

export default SearchPageHeader;