import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Reset.module.css";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `${process.env.REACT_APP_SERVER_URL}/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<Fragment>
			{validUrl ? (
				<div id={styles.loginBody}>
				<div className={styles.greenLayer1}>
					<div id={styles.loginFormDiv}>
						<h2>New Password</h2>
						<form onSubmit={handleSubmit} className="col-6"  name="loginForm" id="loginForm">
							<div className='form-floating mt-3 col-12 mx-2'>
								<input
									type="password"
									id="password"
									name="password"
									placeholder="Create new password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
									className="form-control"
								/>
								{error && <div className={styles.error_msg}>{error}</div>}
								{msg && <div className={styles.success_msg}>{msg}</div>}
								<label htmlFor="password" >Password</label>
							</div>
	
							<div className='d-flex flex-column flex-md-row  mx-2 mt-3 justify-content-between'>
								<button className='col-12 col-md-6' id={styles.loginBtn} type="submit">Reset Password</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default PasswordReset;
