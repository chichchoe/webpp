import React from 'react';
import { Link } from 'react-router-dom';
interface IProps {
    value: any;
}
export default function Card(props: IProps) {
    const gotoDetail = () => {
        console.log(props.value.id);
    };
    return (
        <>
            <div className="column">
                <div className="card">
                    <img
                        src={props.value?.download_url}
                        alt="John"
                        width="100%"
                        height="300px"
                    />
                    <div className="container">
                        <h2>Mike Ross</h2>
                        <p className="title">Art Director</p>
                        <p>
                            Some text that describes me lorem ipsum ipsum lorem.
                        </p>
                        <p>mike@example.com</p>
                        <p>
                            <Link
                                to={`Detail/${props.value.id}`}
                                className="button"
                            >
                                Read
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
