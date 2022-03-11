import React, { useState } from 'react';

import {
    Table,
    Popconfirm,
    Form,
    Typography,
    Button,
    Modal,
    Space,
    Image,
    TablePaginationConfig,
} from 'antd';
import FormCreate, { IRefFormCreate } from './FormCreate';
import faker from '@faker-js/faker/locale/de';
import dataJSON from '../../config/json/data.json';

const filtersAge: any = [];
for (let index = 0; index < 100; index++) {
    filtersAge.push({ text: index.toString(), value: index });
}

export default function HomePage() {
    const [form] = Form.useForm();
    const [data, setData] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setloading] = useState(false);
    const refContainer = React.useRef<IRefFormCreate>(null);

    const showModal = (numberEditRow?: number) => {
        setIsModalVisible(true);
        if (numberEditRow) {
            refContainer.current?.onEditRow(data[numberEditRow]);
        }
    };

    const handleOk = () => {
        refContainer.current?.onSubmit();
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        refContainer.current?.focus();
        setIsModalVisible(false);
    };

    const paginating = (page: number, pageSize: number) => {
        console.log(page);
        console.log(pageSize);
    };

    const columns: any = [
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: 300,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: 300,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            editable: false,
            width: 90,
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
            width: 200,
        },
        {
            title: 'Age',
            sorter: true,
            dataIndex: 'age',
            width: 100,
            filters: filtersAge,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 1000,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 100,
            render: (_: any, record: { key: any }) => {
                return (
                    <Space>
                        <Typography.Link onClick={() => showModal(record.key)}>
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
    React.useEffect(() => {
        setData(dataJSON.data);
    }, []);
    return (
        <div id="container">
            <Form form={form} component={false}>
                <Table
                    scroll={{ x: '100%' }}
                    title={() => {
                        return (
                            <Button type="primary" onClick={() => showModal()}>
                                Create a new
                            </Button>
                        );
                    }}
                    onRow={(r) => ({
                        onClick: () => showModal(r.key),
                    })}
                    bordered
                    dataSource={data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: paginating,
                    }}
                    onChange={(
                        pagination: TablePaginationConfig,
                        filters: any,
                        sorter: any
                    ) => {
                        console.log(filters);
                        console.log(sorter);
                        if (sorter.field === 'age') {
                            setData(
                                data.sort((a: any, b: any) => {
                                    return sorter.order === 'ascend'
                                        ? a.age - b.age
                                        : b.age - a.age;
                                })
                            );
                            setloading(true);
                            const clean = setTimeout(() => {
                                setloading(false);
                                clearTimeout(clean);
                            }, 1000);
                        }
                        // sort name
                        if (sorter.field === 'name') {
                            setData(
                                data.sort((a: any, b: any) => {
                                    return sorter.order === 'ascend'
                                        ? a.name - b.name
                                        : b.name - a.name;
                                })
                            );
                            setloading(true);
                            const clean = setTimeout(() => {
                                setloading(false);
                                clearTimeout(clean);
                            }, 1000);
                        }
                    }}
                    loading={isLoading}
                />
            </Form>
            <Modal
                width="50%"
                keyboard
                title="Create a new"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <FormCreate ref={refContainer} />
            </Modal>
        </div>
    );
}
