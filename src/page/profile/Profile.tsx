import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import {
    decrement,
    increment,
    incrementByAmount,
} from './counterSlice.reducer';

export default function ProfilePage() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(incrementByAmount(5))}
                >
                    Increment
                </button>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}
