import React, { Component } from "react";
import { message, Form } from "antd";
import { Redirect } from "react-router-dom";
import styles from './LoginPage.module.css';
import { Typography } from 'antd';
import axios from 'axios';
import Loading from "../../loading/Loading";
import UserNameFormItem from "./formItems/UserNameFormItem";
import PasswordFormItem from "./formItems/PassworFormItem";
import LoginPrefixFormItem from "./formItems/LoginPrefixFormItem";

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

        if (this.state.redirect) {
            return <Redirect to='/search' />;
        }

        let formComponent;
        if (this.state.doRender) {
            formComponent = (
                <div className={styles.from_wrapper} >
                    <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                        <Title level={2}>My Tube</Title>
                        <UserNameFormItem error={this.state.errorLogin} form={this.props.form} />
                        {" "}
                        <PasswordFormItem error={this.state.errorLogin} form={this.props.form} />
                        {" "}
                        <LoginPrefixFormItem form={this.props.form} />
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
