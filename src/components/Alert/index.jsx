import { NotificationFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Space } from 'antd'
import { useEffect, useState } from 'react'

export const AlertNotification = ({ open, setOpen }) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         handleClose()
    //     }, 4500);
    // }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {open && (
                <Space direction='vertical' style={{ width: '100%', position: "fixed" }}>
                    <Alert
                        message={<h3><InfoCircleOutlined /> Error Code Level 32</h3>}
                        description={<div>
                            <p>Por favor entre em contato com o suporte! </p>
                            <a href="#to">(51)989135015</a>
                        </div>}
                        type="error"
                        closable
                        onClose={handleClose}
                    />
                </Space>
            )}
        </>
    )
}
