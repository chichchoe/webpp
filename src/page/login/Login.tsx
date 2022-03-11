import React from 'react';
interface Iprops {
    setToken: (arg0: IState) => void;
}
interface IState {
    username: string;
    password: string;
}
const initialState = {
    username: '',
    password: '',
};

export default function Login(props: Iprops) {
    const [state, setState] = React.useState<IState>(initialState);
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (state.username === 'admin' && state.password === 'admin') {
            props.setToken({ ...state });
            window.location.href = '/';
        } else {
            console.log('that bai');
        }
    };
    return (
        <div className="bg">
            <div className="login-wrapper">
                <form>
                    <label>
                        <p>Username</p>
                        <input
                            className="formLogin"
                            type="text"
                            placeholder={'Username'}
                            onChange={(e) =>
                                setState((pre) => ({
                                    ...pre,
                                    username: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            className="formLogin"
                            type="password"
                            placeholder={'Password'}
                            onChange={(e) =>
                                setState((pre) => ({
                                    ...pre,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <div>
                        <button type="submit" onClick={handleSubmit}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
