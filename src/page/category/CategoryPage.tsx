import React from 'react';
import { Table } from 'antd';
import qs from 'qs';
import { TablePaginationConfig } from 'antd/lib/table/interface';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name: { first: string; last: string }) =>
            `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

const getRandomuserParams = (params: any) => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    };
};
const initialState = {
    data: [],
    pagination: {
        current: 1,
        pageSize: 10,
    },
    loading: false,
};
export default function CategoryPage() {
    const [{ data, pagination, loading }, setState] =
        React.useState(initialState);
    const fetch1 = async (params: any) => {
        setState((pre) => ({
            ...pre,
            loading: true,
        }));

        const data: any = await fetch(
            `https://randomuser.me/api?${qs.stringify(
                getRandomuserParams(params)
            )}`
        );
        const jsonData = await data.json();
        setState((pre) => ({
            ...pre,
            loading: false,
            data: jsonData.results,
            pagination: {
                ...params.pagination,
                total: 10000,
            },
        }));
    };
    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: any,
        sorter: any
    ) => {
        console.log(sorter);
        fetch1({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };
    React.useEffect(() => {
        fetch1({ pagination });
    }, []);
    return (
        <Table
            columns={columns}
            rowKey={(record: any) => record.login.uuid}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
}
