import React from 'react';
import { Spin, Typography } from "antd";
import styles from './Loading.module.css';

const Loading = () => {

    return (
        <div className={styles.page_loadng}>
            <Typography.Title level={4}>Loading <Spin /></Typography.Title>
        </div>);
}

export default Loading;