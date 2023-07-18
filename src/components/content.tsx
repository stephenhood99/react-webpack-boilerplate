import React from 'react';
import { getValue, incrementValue } from 'state/exampleSlice';
import { useAppDispatch, useAppSelector } from 'state/hooks';

function Content() {
	const [num, setNum] = React.useState(0);
	const dispatch = useAppDispatch();
	const reduxNum = useAppSelector(getValue);

	function handleReduxIncrement() {
		dispatch(incrementValue({ current: reduxNum }));
	}

	return (
		<div>
			<div>{`The useState value is ${num}`}</div>
			<button onClick={() => setNum(num+1)}>Increment it with useState</button>
			<div style={{marginTop: '20px'}}>{`The redux value is ${reduxNum}`}</div>
			<button onClick={() => handleReduxIncrement()}>Increment it with redux</button>
		</div>
	);
}

export default Content;