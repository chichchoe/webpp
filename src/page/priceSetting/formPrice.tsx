import faker from '@faker-js/faker';
import React from 'react';
interface IState {
    email: string;
    id: string | null;
    age: number;
    name: string;
}
const initialState: IState = {
    id: null,
    email: '',
    age: 0,
    name: '',
};
export const FormPrice = React.forwardRef((props: any, ref: any) => {
    const [{ id, email, age, name }, setState] =
        React.useState<IState>(initialState);
    React.useImperativeHandle(ref, () => ({
        onEditRow: (value: any) => {
            console.log(value);
            setState({
                email: value.email,
                id: value.id,
                age: value.age,
                name: value.name,
            });
        },
        focus: () => {
            setState(initialState);
        },
        onSubmit: () => {
            if (id) {
                return { id: id, email, name, age };
            } else {
                return { id: faker.datatype.uuid(), email, name, age };
            }
        },
    }));
    return (
        <div className="form-group">
            <form>
                <div className="form-group-label">
                    <label>Email:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control-name"
                        value={email}
                        onChange={(e) => {
                            setState((pre) => ({
                                ...pre,
                                email: e.target.value,
                            }));
                        }}
                    />
                </div>
                <div className="form-group-label">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control-name"
                        value={name}
                        onChange={(e) => {
                            setState((pre) => ({
                                ...pre,
                                name: e.target.value,
                            }));
                        }}
                    />
                    <label className="form-group-age">Age:</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control-name"
                        value={age}
                        onChange={(e) => {
                            setState((pre) => ({
                                ...pre,
                                age: +e.target.value,
                            }));
                        }}
                    />
                </div>
            </form>
        </div>
    );
});
