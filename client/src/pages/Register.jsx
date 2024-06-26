import React from "react";
import axios from "axios";
//const url = "/api";
const url = "http://localhost:5000/api";

import { FaUser, FaLock, FaHotel } from "react-icons/fa";
import "../assets/css/navbar.css";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import {
  BsCartCheckFill,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import "../assets/css/register.css";
import logo from "../assets/images/Group 2.png";
//import { userRegistration } from "../utils/axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../utils/context";

import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const Register = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const userRegistration = async (user) => {
    return await axios.post(`${url}/register`, user).catch((error) => {
      console.log(error.response.data.msg);
      console.log(error.response.data.msg);
      setLoading(false);

      toast.error(error.response.data.msg);
    });
  };

  const [form] = Form.useForm();
  const onFinish = (e) => {
    console.log(e);
    setLoading(true);

    userRegistration(e)
      .then((response) => {
        console.log("response", response);
        if (response.status === 201) {
          console.log(response.data.token);

          toast.success("Registered successfully");

          console.log("done");
        }
        setLoading(false);
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <article className="register-wrapper">
      <section className="register-container">
        <main className="register-left">
          <main className="reg-left-item">
            <div className="icon-container">
              <BsCartCheckFill className="icon-style" />
            </div>
            <article className="reg-left-article">
              <p className="reg-left-heading">Market Survey</p>
              <p className="left-heading-detail">
                {" "}
                Each review has a personal story,Post yours
              </p>
            </article>
          </main>
          <main className="reg-left-item">
            <div className="icon-container">
              <FaHotel className="icon-style" />
            </div>
            <article className="reg-left-article">
              <p className="reg-left-heading">Product Review</p>
              <p className="left-heading-detail">
                {" "}
                Share your experience to help other make the right decision
              </p>
            </article>
          </main>
          <main className="reg-left-item">
            <div className="icon-container">
              <BsReverseLayoutTextWindowReverse className="icon-style" />
            </div>
            <article className="reg-left-article">
              <p className="reg-left-heading">User Feed Back</p>
              <p className="left-heading-detail">
                {" "}
                Make best use of other people feedback on your desire brand or
                product
              </p>
            </article>
          </main>
        </main>
        <main className="register-main">
          <h2 className="reg-heading" style={{ color: "white" }}>
            Reveew
          </h2>

          <h4 className="reg-sub-heading" style={{ color: "white" }}>
            Register Your account
          </h4>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              name: "",
              email: "",
              Password: "",
              confirm: "",
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item
              style={{ display: "flex", flexDirection: "column" }}
              name="name"
              //   label="Username"
              rules={[
                {
                  type: "text",
                },
                {
                  required: true,
                  message: "Please input your username",
                },
              ]}
            >
              <Input
                prefix={<FaUser fontSize="18px" color="grey" />}
                placeholder="Username"
                className="reg-input"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MdEmail fontSize="18px" color="grey" />}
                placeholder="Email"
                className="reg-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              //   label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<FaLock fontSize="18px" color="grey" />}
                className="reg-input"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<FaLock fontSize="18px" color="grey" />}
                className="reg-input"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <Checkbox className="reg-check">
                <span style={{ color: "white" }}>I have read the </span>{" "}
                <a href="">agreement</a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="reg-btn"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <p style={{ color: "red" }}>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </main>
      </section>
    </article>
  );
};

export default Register;
