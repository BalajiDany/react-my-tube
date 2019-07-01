import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Loading from "../../loading/Loading";
import HTTP_STATUS from "http-status-codes";
import SearchPageHeader from './SearchPageHeader';
import { Layout } from 'antd';
import FileList from './filelist/FileList';
import FileUpload from './fileupload/FileUpload';

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectUrl: '',
            userDetail: {},
            doRender: false
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
            that.setState({ doRender: true, userDetail: { ...response.data } });
        }).catch(function (error) {
            if (error.response && error.response.status === HTTP_STATUS.UNAUTHORIZED) {
                that.setState({ redirect: true, redirectUrl: '/login' });
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl} />;
        }
        let searchPage;
        if (this.state.doRender) {
            searchPage = (
                <Layout>
                    <SearchPageHeader user={this.state.userDetail.userName} doLogout={this.logout} />
                    <FileList user={this.state.userDetail.userName} />
                    <FileUpload />
                </Layout>
            );
        } else {
            searchPage = <Loading />;
        }
        return searchPage;
    }

    logout = () => {
        var session_url = '/my-tube-api/logout';
        axios.post(session_url).finally(function (response) {
            window.location.reload();
        });
    }
}

export default SearchPage;