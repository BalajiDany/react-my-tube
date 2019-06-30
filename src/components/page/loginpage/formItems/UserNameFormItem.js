import React from 'react'
import {Form, Icon, Input} from "antd";

const UserNameFormItem = (props) => {

    const { getFieldDecorator } = props.form;
    return (
        <Form.Item validateStatus={props.error ? "error" : ""} >
            {" "}
            {
                getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please input your username!" }]
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                        placeholder="Username"
                    />
                )
            }
            {" "}
        </Form.Item>
    );

}

export default UserNameFormItem;