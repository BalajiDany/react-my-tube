import React, { Component } from "react";
import { message, Spin, Form, Icon, Input, Button, Checkbox } from "antd";
import { Redirect } from "react-router-dom";
import styles from './LoginPage.module.css';
import { Typography } from 'antd';
import axios from 'axios';
import Loading from "../../loading/Loading";

const { Title } = Typography;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorLogin: false,
            doRender: false,
            redirect: false
        }
    }

    componentDidMount() {
        var session_url = '/my-tube-api/v1/user/whoami';
        var that = this;
        axios.get(session_url, {
            headers: {
                // disabe the www header response.
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(function (response) {
            that.setState({ redirect: true });
        }).catch(function (error) {
            that.setState({ doRender: true });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        var that = this;
        this.props.form.validateFields((err, values) => {
            var session_url = '/my-tube-api/v1/user/whoami';
            var credentials = btoa(values.username + ':' + values.password);
            var basicAuth = 'Basic ' + credentials;
            axios.get(session_url, {
                // Custom header
                headers: {
                    'Authorization': basicAuth,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(function (response) {
                that.setState({ errorLogin: false });
                message.info(`Welcome ${response.data.userName}`);
                that.setState({ redirect: true });
            }).catch(function (error) {
                that.setState({ errorLogin: true });
                message.error('Invalid Username and Password');
            });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        if (this.state.redirect) {
            return <Redirect to='/search' />;
        }

        const userNameFormItem = (
            <Form.Item validateStatus={this.state.errorLogin ? "error" : ""} >
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

        const passwordFormItem = (
            <Form.Item validateStatus={this.state.errorLogin ? "error" : ""} >
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

        const submitFormItem = (
            <Form.Item>
                {" "}
                {
                    getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true
                    })(
                        <Checkbox> Remember me </Checkbox>)
                }
                {" "}
                <a className={styles.login_form_forgot} href="/reset">
                    Forgot password{" "}
                </a>
                {" "}
                <Button type="primary" htmlType="submit" className={styles.login_form_button}>Log in</Button>
                Or <a href="/regiser"> register now! </a>
                {" "}
            </Form.Item>
        );

        let formComponent;
        if (this.state.doRender) {
            formComponent = (
                <div className={styles.from_wrapper} >
                    <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                        <Title level={2}>My Tube</Title>
                        { userNameFormItem }
                        {" "}
                        { passwordFormItem }
                        {" "}
                        { submitFormItem }
                        {" "}
                    </Form>
                </div>)
        } else {
            formComponent = <Loading />;
        }

        return (
            <div className={styles.login_page} >
                {formComponent}
            </div>
        );
    };
}

export default Form.create({ name: "normal_login" })(LoginPage);
