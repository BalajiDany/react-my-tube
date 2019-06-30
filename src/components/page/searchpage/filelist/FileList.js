import React, { Component } from 'react';
import Styles from './FileList.module.css';
import { List, Avatar, Button, Skeleton } from 'antd';
import axios from 'axios';
import defaultImage from '../../../../assert/video-icon-file.png';

const LIMIT = 3;

class FileList extends Component {
    state = {
        initLoading: true,
        loading: false,
        completeLoad: false,
        loadCount: 0,
        data: [],
        list: [],
    };

    componentDidMount() {
        this.getData(res => {
            this.setState(
                (preState) => {
                    const data = res.results;
                    const completeLoad = data.length < LIMIT;
                    return {
                        completeLoad,
                        data,
                        initLoading: false,
                        list: data,
                        loadCount: preState.loadCount + data.length
                    }
                });
        });
    }

    getData = callback => {
        var session_url = '/my-tube-api/v1/assert';
        var that = this;
        axios.get(session_url, {
            params: {
                offset: this.state.loadCount,
                limit: LIMIT
            }
        }).then(function (response) {
            callback({ results: [...response.data] });
        }).catch(function (error) {

        });
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(LIMIT)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData(res => {
            const data = this.state.data.concat(res.results);
            const completeLoad = res.results.length < LIMIT;
            this.setState(
                (preState) => {
                    return {
                        completeLoad,
                        data,
                        list: data,
                        loading: false,
                        loadCount: preState.loadCount + res.results.length
                    }
                },
                () => {
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };

    render() {
        const { initLoading, loading, list, completeLoad } = this.state;
        const loadMore = !initLoading && !loading && !completeLoad > 0 ? (
            <div className={Styles.load_more} >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        return (
            <List
                className={Styles.file_list}
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <Avatar shape="square" size={82} src={defaultImage}>
                            </Avatar>
                            <List.Item.Meta
                                title={<a href="/">{item.fileName}</a>}
                                description={item.filePath}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default FileList;