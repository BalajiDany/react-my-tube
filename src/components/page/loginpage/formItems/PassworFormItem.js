import React from 'react'
import {Form, Icon, Input} from "antd";

const PasswordFormItem = (props) => {

    const { getFieldDecorator } = props.form;
    return (
        <Form.Item validateStatus={props.error ? "error" : ""} >
            {" "}
            {
                getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please input your Password!" }]
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                        type="password"
                        placeholder="Password"
                    />
                )
            }
            {" "}
        </Form.Item>
    );
}

export default PasswordFormItem;