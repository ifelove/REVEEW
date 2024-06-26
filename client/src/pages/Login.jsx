import React from "react";
import "antd/dist/antd";
//const url = "/api";
//const url https://reveew.onrender.com/api/login
const url = "http://localhost:5000/api";
import { Button, Checkbox, Form, Input } from "antd";
import "../assets/css/login.css";
import axios from "axios";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { FaUser, FaLock, FaHotel } from "react-icons/fa";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import { userLogin } from "../utils/axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../utils/context";
import { SET_USER, SET_IS_LOGIN } from "../redux/action";
import { connect } from "react-redux";

const Login = ({ user, isLogin, setUser, setIsLogin }) => {
  // const { user, setUser } = useGlobalContext();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userLogin = async (credentials) => {
    return await axios
      .post(`${url}/login`, credentials)
      .then((response) => {
        setLoading(false);
        if (response.status == "200") {
          console.log(response.data.user);
          // setUser(response.data.user);
          setIsLogin(true);

          //   localStorage.setItem("loggedIn", true);
          //  localStorage.setItem(
          //    "loggedUser",
          ///   JSON.stringify(response.data.user)
          //   );
          toast.success("Login successfully");
        }
      })
      .then(() => {
        navigate(from, { replac: true });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.msg);
        console.log(error.response.data.msg);

        //setErrorMessage(error.response.data.msg);
        toast.error(error.response.data.msg);
      });
  };

  const onFinish = (e) => {
    console.log(e);
    setLoading(true);

    userLogin(e)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          console.log(response);
          toast.success("Login successfully");
          //  localStorage.setItem("token", token);
          //  localStorage.setItem("user", user);
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.response);
        //  console.log(error.response.data.msg);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        //  console.log(error.request);
        //  console.log(error.message);
      });
    setLoading(false);
  };
  return (
    <div className="login-wrapper">
      <section className="login-container">
        <h2 className="login-heading">REVEEW</h2>
        <p className="login-sub-heading"> Login to your account</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={
                <MdEmail
                  className="site-form-item-icon login-input"
                  color="grey"
                />
              }
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={
                <FaLock
                  className="site-form-item-icon login-input"
                  color="grey"
                />
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>
              <span style={{ color: "red" }}>Remember me</span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-btn"
              loading={loading}
            >
              Log in
            </Button>
            <p style={{ color: "red" }}>
              Not yet registered? <Link to="/register">Register</Link>
            </p>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, isLogin: state.user.isLogin };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: SET_USER, payload: { user: user } }),
    setIsLogin: (status) =>
      dispatch({ type: SET_IS_LOGIN, payload: { status: status } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
