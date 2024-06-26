import React from "react";
import { Input, Rate, Form } from "antd";
import "../assets/css/postReview.css";
import axios from "axios";
//const url = "/api";
const url = "http://localhost:5000/api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PostReview = () => {
  // const token = localStorage.getItem("token");
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //const user = localStorage.getItem("user");
  const location = useLocation();
  const single = location.state?.single?.pathname || "/";
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState(3);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [form] = Form.useForm();
  const onFinish = (e) => {
    console.log(e);
    console.log(value);
    const feedback = { ...e, value: value };
    console.log(feedback);
    postFeedbaack(feedback);
  };

  const postFeedbaack = (feedback) => {
    axios
      .post(`${url}/reviews/${id}?reviewed=product`, { feedback })
      .then((response) => {
        console.log(response);

        if (response.status == "200") {
          toast.success("Your review has been posted");
          navigate(single, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == "401") {
          navigate("/login", { state: { from: location }, replace: true });
          toast.warning("Login to Post a Review");
        }
      });
  };

  return (
    <section className="post-review-wrapper">
      <div className="post-review-container">
        <h3>Post your product review </h3>

        <div className="rating-click">
          <p>Rating</p>
          <span>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? (
              <span className="ant-rate-text">{desc[value - 1]}</span>
            ) : (
              ""
            )}
          </span>
        </div>
        <Form
          name="normal_post"
          className="post-form"
          layout="vertical"
          initialValues={
            {
              //  remember: true,
            }
          }
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input review title!",
              },
            ]}
          >
            <Input maxLength={60} />
          </Form.Item>

          <Form.Item
            label="Review"
            name="comment"
            rules={[
              {
                required: true,
                message: "Please input review!",
              },
            ]}
          >
            <Input.TextArea maxLength={300} style={{ height: "200px" }} />
          </Form.Item>
          <div className="btn-container">
            <button type="submit" className="post-review-btn post-btn">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default PostReview;
