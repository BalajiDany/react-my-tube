import React from 'react'
import { Form, Button, Checkbox } from "antd";

const LoginPrefixFormItem = (props) => {
    const { getFieldDecorator } = props.form;

    const login_form_forgot = {
        float: 'right'
    }

    const login_form_button = {
        width: '100%'
    }

    return (
        <Form.Item>
            {" "}
            {
                getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                })(<Checkbox> Remember me </Checkbox>)
            }
            {" "}
            <a style={login_form_forgot} href="/reset">
                Forgot password{" "}
            </a>
            {" "}
            <Button type="primary" htmlType="submit" style={login_form_button} >Log in</Button>
            Or <a href="/regiser"> register now! </a>
            {" "}
        </Form.Item>
    );
}

export default LoginPrefixFormItem;