import React from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    Cascader,
    Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AddressOptions } from '../../common/Address';

const { Option } = Select;
interface IState {
    email: string;
    name: string;
    avatar: string;
    phone: string;
    age: number;
    address: string;
}
export interface IRefFormCreate {
    focus: () => void;
    onSubmit: () => void;
    onEditRow: (value: any) => void;
}
interface IProps {}
const initialState = {
    email: '',
    name: '',
    avatar: '',
    phone: '',
    age: 0,
    address: '',
};
const FormCreate = React.forwardRef((props: IProps, ref: any) => {
    const [form] = Form.useForm();
    const [{ email, name, avatar, phone, age, address }, setState] =
        React.useState<IState>(initialState);

    React.useImperativeHandle<IRefFormCreate, IRefFormCreate>(ref, () => ({
        onEditRow: (value: any) => {
            form.setFieldsValue({
                email: value.email,
                name: value.name,
                phone: value.phone,
                age: value.age,
                avatar: value.avatar,
                address: value.address,
            });
            setState((pre) => ({
                ...pre,
                email: value.email,
                name: value.name,
                phone: value.phone,
                age: value.age,
                avatar: value.avatar,
                address: value.address,
            }));
        },
        focus: () => {
            form.resetFields([
                'email',
                'name',
                'phone',
                'age',
                'avatar',
                'address',
            ]);
            setState({
                email: '',
                name: '',
                phone: '',
                age: 0,
                avatar: '',
                address: '',
            });
        },
        onSubmit: () => {
            // console.log('object');
            console.log({ email, name, avatar, phone, age, address });
        },
    }));

    const normFile = (e: { fileList: any }) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    React.useEffect(() => {
        form.validateFields(['email']);
    }, [email]);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 100,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            size="large"
            layout={'horizontal'}
            form={form}
            name="dynamic_rule"
        >
            <Form.Item
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input Email',
                    },
                ]}
                label="Email"
                name={'email'}
                colon={false}
                shouldUpdate
            >
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(value) => {
                        setState((pre) => ({
                            ...pre,
                            email: value.target.value,
                        }));
                    }}
                />
            </Form.Item>
            <Form.Item label="Name" name={'name'}>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(value) => {
                        setState((pre) => ({
                            ...pre,
                            name: value.target.value,
                        }));
                    }}
                />
            </Form.Item>

            {/* <Row>
                <Col span={12}> */}
            {/* <Form.Item
                        label="Phone"
                        name={'phone'}
                        style={{ width: '100%' }}
                    >
                        <Input
                            placeholder="Phone"
                            value={phone}
                            onChange={(value) => {
                                setState((pre) => ({
                                    ...pre,
                                    phone: value.target.value,
                                }));
                            }}
                        />
                    </Form.Item> */}

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item label="Age" name={'age'}>
                <InputNumber
                    placeholder="Age"
                    min={20}
                    max={100}
                    value={age}
                    onChange={(value) => {
                        setState((pre) => ({
                            ...pre,
                            age: value,
                        }));
                    }}
                />
            </Form.Item>

            <Form.Item label="Address">
                <Cascader
                    options={AddressOptions}
                    showSearch
                    value={address.split(',')}
                    onChange={(value) => {
                        console.log(value);
                        console.log(typeof value);
                        if (value) {
                            setState((pre) => ({
                                ...pre,
                                address: value.join(','),
                            }));
                        } else {
                            setState((pre) => ({
                                ...pre,
                                address: '',
                            }));
                        }
                    }}
                />
            </Form.Item>
            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
        </Form>
    );
});
export default FormCreate;
