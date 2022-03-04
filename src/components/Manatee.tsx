import React from 'react';
import Card from './Card';

export default function Manatee() {
    const [state, setstate] = React.useState<any[]>([]);
    React.useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=1&limit=20')
            .then((res) => res.json())
            .then((json) => {
                setstate(json);
            });
    }, []);
    return (
        <>
            <div>
                <div id="textInside">
                    <img
                        className="imgBackground"
                        src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
                        alt="Snow"
                    />
                    <p id="insideBackground">Welcome to blog Mr.T</p>
                </div>
                <p id="content">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="row">
                    {state.map((v: any, index: number) => {
                        return <Card value={v} />;
                    })}
                </div>
            </div>
        </>
    );
}
