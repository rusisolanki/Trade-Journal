import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

function Login() {

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setLoginUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        "http://localhost:3000/authentication/login",
        loginUser
      );
      localStorage.setItem('user', JSON.stringify(login.data))
      setError("");
      navigate(`/${login.data.id}`);
    } catch (error) {
      setError(error.response.data);
    }
    setLoginUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className={classes.authenticationPage}>
      <div className={classes.authentication}>
        <h2 className={classes.logo}>TradeJournal</h2>
        <div className={classes.user}>
          <Form className={classes.form}>
            <h3 className={classes.heading}>Login</h3>
            {error && <p className={classes.error}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={loginUser.email}
                placeholder="Enter email"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginUser.password}
                placeholder="Enter password"
                onChange={changeHandler}
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              onClick={submitHandler}
              className={classes.actionButton}
            >
              Sign In
            </Button>
          </Form>
        </div>
        <div>
            <p>
              Don&apos;t have an account?
              <button className={classes.button} onClick={() => navigate('/authentication/register')}>
                Register
              </button>
            </p>
        </div>
      </div>
      <div className={classes.image}>
        <img src="/trade.jpg" alt="Trade" className={classes.tradeImage} />
      </div>
    </div>
  );
}

export default Login;
