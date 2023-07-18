import React from 'react';
import styles from './App.less';
import Content from 'components/content';

function App() {
	return (
		<div className={styles.app}>
			<h1 className={styles.appText}>Hello World!</h1>
			<Content/>
		</div>
	);
}

export default App;
