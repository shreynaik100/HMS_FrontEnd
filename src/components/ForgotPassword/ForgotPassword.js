import { useState } from "react";
import axios from "axios";
import styles from "./Forgot.module.css";
import { useNavigate } from "react-router-dom";


function ForgotPassword () {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
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

	const loginClicked = () => {
        navigate("/");
    }

	return (
		
		<div id={styles.loginBody}>
            <div className={styles.greenLayer1}>
                <div id={styles.loginFormDiv}>
                    <h2>Forgot Password</h2>
					<p>Please enter email address you'd like your password <br/>reset information sent to</p>
                    <form onSubmit={handleSubmit} className="col-6"  name="loginForm" id="loginForm">
						
                        <div className='form-floating mt-1 col-12 mx-2'>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="form-control"
                            />
							{error && <div className={styles.error_msg}>{error}</div>}
							{msg && <div className={styles.success_msg}>{msg}</div>}
                            <label htmlFor="email" >Email</label>
                        </div>

                        <div className='d-flex flex-column flex-md-row  mx-2 mt-3 justify-content-between'>
                            <button className='col-12 col-md-6' id={styles.loginBtn} type="submit">Request reset link</button>
							<button type="button" className={["col-12 col-md-6 mt-3 mt-md-0", styles.signUpBtn].join(" ")} onClick={loginClicked} >Back to Login</button>
					    </div>
						
                    </form>
                </div>
            </div>
        </div>
	);
};

export default ForgotPassword;