import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import './register.css'

// this enforces proper email syntax
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// Must include an UPPERCASE, lowercase, numeral and special character and be more than 8 characters long
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*]).{8,}$/;
const REGISTER_URL = "/register";

/* Built from: https://blog.openreplay.com/user-registration-and-login-with-react-and-axios/ */

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();
    const [displayName, setDisplayName] = useState("");
    const [dislayNameFocus, setDisplayNameFocus] = useState(false);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const role = 'user';

    useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return; 
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({displayName, email, pwd, role }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setSuccess(true);
            //Reset the stored user/password information back to nothing
            setDisplayName("");
            setEmail("");
            setPwd("");
            setMatchPwd("");
        } 
        catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response")
            } else if (err.response.status === 409) {
                setErrMsg("Username already exists")
            } else {
                setErrMsg("Registration Failed")
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section>
                <p 
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="displayName">
                        Username:
                        {/* <FontAwesomeIcon
                        icon={faCheck}
                        className={ validEmail ? 'valid' : 'hide' }
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validEmail || !email ? "hide" : "invalid"
                        }
                        /> */}
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        // ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                        required
                        // aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setDisplayNameFocus(true)}
                        onBlur={() => setDisplayNameFocus(false)}
                    />
                    {/* <p
                        id="uidnote"
                        className={
                        userFocus && email && !validEmail
                            ? "instructions"
                            : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Enter a vaild email in address.
                    </p> */}
                    
                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon
                        icon={faCheck}
                        className={ validEmail ? 'valid' : 'hide' }
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validEmail || !email ? "hide" : "invalid"
                        }
                        />
                    </label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        id="uidnote"
                        className={
                        userFocus && email && !validEmail
                            ? "instructions"
                            : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Enter a vaild email in address.
                    </p>
                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validPwd || !pwd ? "hide" : "invalid"
                        }
                        />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        id="pwdnote"
                        className={
                        pwdFocus && !validPwd
                            ? "instructions"
                            : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        At least 8 characters long.
                        <br />
                        Must an UPPERCASE a lowercase, a
                        number, and a special character.
                        <br />
                        Allowed special characters:
                        {" "}<span aria-label="number symbol">#</span>
                        {" "}<span aria-label="question mark">?</span>
                        {" "}<span aria-label="exclamation mark">!</span>
                        {" "}<span aria-label="at symbol">@</span>
                        {" "}<span aria-label="dollar sign">$</span>
                        {" "}<span aria-label="percent">%</span>
                        {" "}<span aria-label="caret">^</span>
                        {" "}<span aria-label="ampersand">&</span>
                        {" "}<span aria-label="star">*</span>
                    </p>
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon
                        icon={faCheck}
                        className={
                            validMatch && matchPwd ? "valid" : "hide"
                        }
                        />
                        <FontAwesomeIcon
                        icon={faTimes}
                        className={
                            validMatch || !matchPwd ? "hide" : "invalid"
                        }
                        />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id="confirmnote"
                        className={
                        matchFocus && !validMatch
                            ? "instructions"
                            : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <button
                        disabled={
                        !validEmail || !validPwd || !validMatch
                            ? true
                            : false
                        }
                    >
                        Sign Up
                    </button>
                    </form>
                    <p>
                    Already registered?
                    <br />
                    <span className="line">
                        <a href="/login">Sign In</a>
                    </span>
                    </p>
            </section>
        </>
    );
};

export default Register;