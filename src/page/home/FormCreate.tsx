import React from 'react';
import { Form, Input, InputNumber } from 'antd';
interface IState {
    email: string;
    name: string;
    avatar: string;
    phone: string;
    age: number;
}
export interface IRefFormCreate {
    focus: () => void;
    onSubmit: () => void;
}
interface IProps {}
const initialState = {
    email: '',
    name: '',
    avatar: '',
    phone: '',
    age: 0,
};
const FormCreate = React.forwardRef((props: IProps, ref: any) => {
    const [form] = Form.useForm();

    const [{ email, name, avatar, phone, age }, setState] =
        React.useState<IState>(initialState);
    React.useImperativeHandle<IRefFormCreate, IRefFormCreate>(ref, () => ({
        focus: () => {
            form.resetFields(['email', 'name']);
        },
        onSubmit: () => {
            // console.log('object');
            console.log({ email, name, avatar, phone, age });
        },
    }));
    React.useEffect(() => {
        form.validateFields(['email']);
    }, [email]);
    return (
        <Form layout={'inline'} form={form} name="dynamic_rule">
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
            <Form.Item label="Phone" name={'phone'}>
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
            </Form.Item>
            <Form.Item label="Age" name={'age'}>
                <InputNumber
                    placeholder="Age"
                    min={20}
                    max={100}
                    defaultValue={20}
                    value={age}
                    onChange={(value) => {
                        setState((pre) => ({
                            ...pre,
                            age: value,
                        }));
                    }}
                />
            </Form.Item>
            <Form.Item label="Avatar" name={'avatar'}>
                <Input
                    placeholder="avatar"
                    value={avatar}
                    onChange={(value) => {
                        setState((pre) => ({
                            ...pre,
                            avatar: value.target.value,
                        }));
                    }}
                />
            </Form.Item>
        </Form>
    );
});
export default FormCreate;
