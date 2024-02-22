import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import picture from '../../assets/img/pic.png'
import './login.scss'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth();
    const navigate = useNavigate();
    function loginUser(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <div className="form__block">
            <div className="formLogin__container">
                <div className="form__img">
                    <img src={picture} alt="pic" />
                </div>
                <form onSubmit={loginUser}>
                    <div></div>
                    <div className="inputBlock">
                        <h1>Login</h1>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Login</button>
                    </div>
                    <span>Don't have an account? <Link to='/register'>Register</Link></span>
                </form>
            </div>
        </div>
    )
}
