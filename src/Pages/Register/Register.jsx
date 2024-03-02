import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import picture from "../../assets/img/pic.png";
import "./register.scss";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  function validPassword() {
    return password == passwordConfirm;
  }
  function registerUser(e) {
    e.preventDefault();
    if (!validPassword()) {
      setError(true);
    } else {
      setError(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
  return (
    <div className="form__block">
      <div className="formRegister__container">
        <div className="form__img">
          <img src={picture} alt="pic" />
        </div>
        <form onSubmit={registerUser}>
          <h1>Registration</h1>
          <div className="inputBlock">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password ( min 6 characters )"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {error && <p className="errorText">Passwords don't match!</p>}
            <button>Register</button>
          </div>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
