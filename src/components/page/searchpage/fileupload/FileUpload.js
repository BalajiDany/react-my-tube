import React, { Component } from 'react'
import { Modal, Button, Upload, Icon, message } from 'antd'
const { Dragger } = Upload;

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadModelvisiblilty: false
        }
    }

    showModal = () => {
        this.setState({
            uploadModelvisiblilty: true,
        });
    };

    handleOk = e => {
        this.setState({
            uploadModelvisiblilty: false,
        });
    };

    handleCancel = e => {
        this.setState({
            uploadModelvisiblilty: false,
        });
    };

    beforeUpload = (file) => {
        const isVideo = file.type === 'video/mp4';
        if (!isVideo) {
            message.error('You can only upload mp4 file!');
        }
        return isVideo
    };

    onChange = (info) => {
        const { status } = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    render() {

        const style = {
            position: 'fixed',
            bottom: '32px',
            right: '62px'
        }

        const props = {
            name: 'file',
            action: '/my-tube-api/v1/assert/upload',
            beforeUpload: this.beforeUpload,
            onChange: this.onChange,
        };

        return (
            <div>
                <Button style={style}
                    onClick={this.showModal}
                    type="primary"
                    shape="circle"
                    icon="upload"
                    size='large' />
                <Modal
                    title="Basic Modal"
                    visible={this.state.uploadModelvisiblilty}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Upload the videos. Support for only MP4. single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </Modal>
            </div>
        );
    }
};

export default FileUpload;