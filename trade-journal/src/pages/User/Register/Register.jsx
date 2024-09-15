import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setRegisterUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post(
        "http://localhost:3000/authentication/register",
        registerUser
      );
      setSuccess(register.data);
      setError("");
      navigate('/authentication/login');
    } catch (error) {
      setError(error.response.data);
    }
    setRegisterUser({
      name: "",
      phone: "",
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
            <h3 className={classes.heading}>Register</h3>
            {error ? (
              <p className={classes.error}>{error}</p>
            ) : (
              <p className={classes.success}>{success}</p>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={registerUser.name}
                placeholder="Enter full name"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={registerUser.phone}
                placeholder="Enter phone number"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registerUser.email}
                placeholder="Enter email"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={registerUser.password}
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
              Register
            </Button>
          </Form>
        </div>
        <div>
            <p>
              Have an account?
              <button className={classes.button} onClick={() => navigate('/authentication/login')}>
                Login
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

export default Register;
