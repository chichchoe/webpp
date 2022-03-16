import React from 'react';
import { Table, Image, Button, Modal, Popconfirm, Space } from 'antd';
import { FormPrice } from './formPrice';
const filtersAge: any = [];
for (let index = 0; index < 30; index++) {
    filtersAge.push({ text: (20 + index).toString(), value: index });
}

interface IState {
    data: any;
    pagination: any;
    loading: boolean;
}
const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 10,
    },
    loading: false,
};
export default function PriceSetting() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const refContainer = React.useRef<any>(null);
    const [{ data, pagination, loading }, setState] =
        React.useState<IState>(initialState);
    const showModal = (numberEditRow?: any) => {
        setIsModalVisible(true);

        if (numberEditRow) {
            const index = data.findIndex(
                (v: { id: any }) => v.id === numberEditRow
            );
            refContainer.current?.onEditRow(data[index]);
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        refContainer.current?.focus();
    };
    const submitModal = () => {
        setIsModalVisible(false);
        const dataModal = refContainer.current?.onSubmit();
        const index = data.findIndex((v: { id: any }) => v.id === dataModal.id);
        if (index > -1) {
            data[index] = dataModal;
            setState((pre) => ({
                ...pre,
                data: [...data],
            }));
        } else {
            setState((pre) => ({
                ...pre,
                data: data.concat([dataModal]),
            }));
        }

        refContainer.current?.focus();
    };
    const paginating = (page: number, pageSize: number) => {
        console.log(page);
        console.log(pageSize);
    };
    const deleteRow = (id: any) => {
        const index = data.findIndex((v: { id: any }) => v.id === id);
        if (index > -1) {
            data.splice(index, 1);
            setState((pre) => ({
                ...pre,
                data: [...data],
            }));
        }
    };
    const columns: any = [
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Age',
            sorter: true,
            filters: filtersAge,
            dataIndex: 'age',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            fixed: 'right',
            width: 100,
            render: (_: any, record: { id: string }) => {
                return (
                    <Space>
                        <Button
                            onClick={() => showModal(record.id)}
                            type="link"
                            block
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteRow(record.id)}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <>
            <Table
                bordered
                title={() => {
                    return (
                        <Button type="primary" onClick={() => showModal()}>
                            Create a new
                        </Button>
                    );
                }}
                // onRow={(r) => ({
                //     onClick: () => showModal(),
                // })}
                columns={columns}
                rowKey={(record: any) => record.id}
                dataSource={data}
                pagination={{
                    onChange: paginating,
                }}
                loading={loading}
                onChange={() => {}}
            />
            <Modal
                width="50%"
                keyboard
                title="Create a new"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={submitModal}
            >
                <FormPrice ref={refContainer} />
            </Modal>
        </>
    );
}
