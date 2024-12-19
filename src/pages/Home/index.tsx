import preactLogo from '../../assets/tatum.jpeg'
import Form from './form';
import './style.css';

const PREACT_URL = import.meta.env.VITE_TATUM_URL || "https://tatum.io";	

export function Home() {
	return (
		<div class="home">
			<a href={PREACT_URL} target="_blank" rel="noopener noreferrer">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Tatum Ethereum Wallet Balance Checker</h1>
			<Form />
		</div>
	);
}
