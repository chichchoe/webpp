import React, { useState } from 'react';

import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Typography,
    Button,
    Modal,
    Space,
    Image,
} from 'antd';
import FormCreate from './FormCreate';
import faker from '@faker-js/faker/locale/de';
const originData: any[] | (() => any[]) = [];

for (let i = 0; i < 20; i++) {
    originData.push({
        key: i.toString(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar(),
        phone: faker.phone.phoneNumber(),
        age: faker.datatype.number({ min: 20, max: 40 }),
        address: faker.address.city(),
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}: any) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function HomePage() {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const isEditing = (record: { key: string }) => record.key === editingKey;

    const edit = (record: { key: React.SetStateAction<string> }) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: any) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            editable: true,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            editable: false,
            render: (_: any, record: { key: any }) => {
                return (
                    <Image
                        preview={false}
                        src={data[record.key].avatar}
                        width={50}
                    />
                );
            },
        },
        {
            title: 'Phone',
            sorter: true,
            dataIndex: 'phone',
            width: '20%',
            editable: true,
        },
        {
            title: 'Age',
            sorter: true,
            dataIndex: 'age',
            editable: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '100%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_: any, record: { key: any }) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => {}}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: { key: string }) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div id="container">
            <Form form={form} component={false}>
                <Table
                    scroll={{ x: '100%' }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    title={() => {
                        return (
                            <Button type="primary" onClick={showModal}>
                                Create a new
                            </Button>
                        );
                    }}
                    onRow={(r) => ({
                        onClick: () => console.log(r.key),
                    })}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            <Modal
                width="50%"
                title="Create a new"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <FormCreate />
            </Modal>
        </div>
    );
}
