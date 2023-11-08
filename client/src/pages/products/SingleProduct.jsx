import React from "react";
import Navbar from "../../components/Navbar";
import "../../assets/css/singleProduct.css";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Rate, Progress } from "antd";
import axios from "axios";
//const url = "http://localhost:5000/api";
const url = "/api";
import { Alert, Space, Spin } from "antd";
import { HashLink } from "react-router-hash-link";

const SingleProduct = () => {
  const location = useLocation();
  const { category, product, id } = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = React.useState({});
  const [reviews, setReviews] = React.useState([]);
  const [numOfFiveReview, setNumOfFiveReview] = React.useState(0);
  const [numOfFourReview, setNumOfFourReview] = React.useState(0);
  const [numOfThreeReview, setNumOfThreeReview] = React.useState(0);
  const [numOfTwoReview, setNumOfTwoReview] = React.useState(0);
  const [numOfOneReview, setNumOfOneReview] = React.useState(0);
  const [numOfZeroReview, setNumOfZeroReview] = React.useState(0);
  const [isproductLoading, setIsProductLoading] = React.useState(false);
  const [isReviewLoading, setIsReviewLoading] = React.useState(false);

  let totalReviews = 0;

  const getAllProducts = async () => {
    return await axios.get(`${url}/products/${id}`).catch((error) => {
      console.log(error);
      //toast.error(error.message);
    });
  };

  const getAllReviews = async () => {
    return await axios.get(`${url}/reviews/${id}`).catch((error) => {
      console.log(error);
      //toast.error(error.message);
    });
  };

  const fetchData = async () => {
    setIsProductLoading(true);
    try {
      const response = await getAllProducts();

      const { product } = response.data;

      console.log(response);

      setProductInfo(product);
      setIsProductLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    // Use an async function to fetch data

    fetchData();
  }, []);
  console.log(productInfo);
  const {
    product_name,
    product_desc,
    price,
    product_Avgrating,
    numOfReview,
    img,
    products_imgs,
    product_brand,
    product_features,
    specification,
  } = productInfo;

  const fetchReview = async () => {
    setIsReviewLoading(true);
    try {
      const response = await getAllReviews();

      const { reviews } = await response.data;

      console.log(response);

      setReviews(reviews);
      setIsReviewLoading(false);
      setNumOfZeroReview(response?.data?.numOfZeroReview);
      setNumOfOneReview(response?.data?.numOfOneReview);
      setNumOfTwoReview(response?.data?.numOfTwoReview);
      setNumOfThreeReview(response?.data?.numOfThreeReview);
      setNumOfFourReview(response?.data?.numOfFourReview);
      setNumOfFiveReview(response?.data?.numOfFiveReview);

      totalReviews =
        numOfZeroReview +
        numOfOneReview +
        numOfTwoReview +
        numOfThreeReview +
        numOfFourReview +
        numOfFiveReview;

      console.log("totalreview", totalReviews);
      console.log("num", numOfFiveReview);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    // Use an async function to fetch data

    fetchReview();
  }, []);

  return (
    <div>
      <main className="navbar-section">
        <Navbar />
      </main>
      {isproductLoading && (
        <div className="product-spin">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Spin tip="Loading" size="large">
              <div className="content " />
            </Spin>{" "}
          </Space>
        </div>
      )}

      {!isproductLoading && product.length == [] && <div>No data Product</div>}
      {!isproductLoading && product.length > 0 && (
        <div>
          {" "}
          <section className="single-product-link">
            <div className="left-query">
              <p className="heading-link">
                <Link to="/" style={{ color: "black" }}>
                  Home{" "}
                </Link>{" "}
                <span>/</span>
                {category}{" "}
                <span>
                  {" "}
                  <span style={{ color: "black" }}></span>
                  {product}
                </span>
              </p>
              <h2 className="product-heading">{product}</h2>
            </div>
          </section>
          <div className="underline"></div>
          <main className="single-product-wrapper">
            {/**single product container */}
            <section className="single-product-container">
              {/**single images display container */}

              <div>
                <img src={img} alt="" className="image-container" />
              </div>

              <section className="product-details-container">
                <article className="product-details" id="product-details">
                  <div className="product-desc-section_1">
                    <h2 className="product-details-heading">
                      Product Description
                    </h2>
                    <div className="underline"></div>
                    <main className="description">
                      <p>{product_desc}</p>
                      <p>Price:${price}</p>
                    </main>
                  </div>
                  <div
                    className="product-desc-section_2"
                    id="product-specificaton"
                  >
                    <h2 className="product-details-heading">
                      Product Specification
                    </h2>
                    <div className="underline"></div>
                    <main className="description">
                      <div className="product-key-features">
                        <h4 className="key-features-heading">
                          <b>Key features</b>{" "}
                        </h4>
                        <div className="underline"></div>
                        <ul className="key-lists">
                          {product_features?.map((item) => {
                            return `
                              ${item}
                          `;
                          })}
                        </ul>
                      </div>
                      <div className="product-key-spec">
                        <h4 className="key-features-heading">
                          <b>Specification</b>{" "}
                        </h4>
                        <div className="underline"></div>
                        <ul className="key-lists">
                          {specification?.map((item) => {
                            return `${item}`;
                          })}
                        </ul>
                      </div>
                    </main>
                  </div>

                  <div className="product-desc-section_2" id="product-review">
                    <h2 className="product-review-heading">Reviews </h2>
                    <div className="underline"></div>
                    <main className="description">
                      <div className="average-rate">
                        <div className="rating-first-layer">
                          <main className="average-rating-container">
                            <div>
                              <p className="avg-rate-p">
                                <b>{product_Avgrating}</b> <span>/</span>5
                              </p>
                            </div>

                            <div>
                              <Rate
                                value={product_Avgrating}
                                defaultValue={product_Avgrating}
                              />
                            </div>
                            <p>{numOfReview} verified ratings</p>
                          </main>
                          <main className="rating-first-layer-right">
                            <article className="rate-desc">
                              {" "}
                              <p className="rate-star">5 Star</p>{" "}
                              <Progress
                                percent={
                                  (numOfFiveReview /
                                    (numOfZeroReview +
                                      numOfOneReview +
                                      numOfTwoReview +
                                      numOfThreeReview +
                                      numOfFourReview +
                                      numOfFiveReview)) *
                                  100
                                }
                                showInfo={false}
                                className="progress"
                              />
                              <span className="rate-num-rating">
                                {numOfFiveReview}
                              </span>
                            </article>
                            <article className="rate-desc">
                              {" "}
                              <p className="rate-star">4 Star</p>{" "}
                              <Progress
                                percent={
                                  (numOfFourReview /
                                    (numOfZeroReview +
                                      numOfOneReview +
                                      numOfTwoReview +
                                      numOfThreeReview +
                                      numOfFourReview +
                                      numOfFiveReview)) *
                                  100
                                }
                                showInfo={false}
                                className="progress"
                              />
                              <span>{numOfFourReview}</span>
                            </article>
                            <article className="rate-desc">
                              {" "}
                              <p className="rate-star">3 Star</p>{" "}
                              <Progress
                                percent={
                                  (numOfThreeReview /
                                    (numOfZeroReview +
                                      numOfOneReview +
                                      numOfTwoReview +
                                      numOfThreeReview +
                                      numOfFourReview +
                                      numOfFiveReview)) *
                                  100
                                }
                                showInfo={false}
                                className="progress"
                              />{" "}
                              <span>{numOfThreeReview}</span>
                            </article>
                            <article className="rate-desc">
                              {" "}
                              <p className="rate-star">2 Star</p>{" "}
                              <Progress
                                percent={
                                  (numOfTwoReview /
                                    (numOfZeroReview +
                                      numOfOneReview +
                                      numOfTwoReview +
                                      numOfThreeReview +
                                      numOfFourReview +
                                      numOfFiveReview)) *
                                  100
                                }
                                showInfo={false}
                                className="progress"
                              />
                              <span>{numOfTwoReview}</span>
                            </article>
                            <article className="rate-desc">
                              {" "}
                              <p className="rate-star">1 Star</p>{" "}
                              <Progress
                                percent={
                                  (numOfOneReview /
                                    (numOfZeroReview +
                                      numOfOneReview +
                                      numOfTwoReview +
                                      numOfThreeReview +
                                      numOfFourReview +
                                      numOfFiveReview)) *
                                  100
                                }
                                showInfo={false}
                                className="progress"
                              />
                              <span>{numOfOneReview}</span>
                            </article>
                          </main>
                        </div>
                      </div>
                    </main>
                    <div className="underline"></div>

                    {isReviewLoading && (
                      <div className="product-spin">
                        <Space
                          direction="vertical"
                          style={{
                            width: "100%",
                          }}
                        >
                          <Spin tip="Loading" size="large">
                            <div className="content " />
                          </Spin>{" "}
                        </Space>
                      </div>
                    )}
                    {!isReviewLoading && reviews.length == [] && (
                      <div>No Review Yet For this Product</div>
                    )}
                    {!isReviewLoading && reviews.length > 0 && (
                      <section className="user-reviews">
                        {reviews?.map((review) => {
                          const {
                            title,
                            comment,
                            reviewer,
                            value,
                            formattedTimestamp,
                            _id,
                          } = review;
                          console.log(reviewer);
                          const name = reviewer?.name || "user";

                          // const { name } = reviewer;

                          return (
                            <article className="the-review" key={_id}>
                              <div className="reviewer-container">
                                <div className="user-avatar-container">
                                  {" "}
                                  <p className="user-avatar">
                                    {" "}
                                    {name.charAt(0)}
                                  </p>
                                </div>
                                {/**<img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                  alt=""
                                  className="reviewer-img"
                                /> */}{" "}
                                <p className="reviewer-2">
                                  <span className="user-name">{name}</span>
                                  <span style={{ fontSize: "12px" }}>
                                    {formattedTimestamp}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <Rate defaultValue={value} value={value} />
                              </div>
                              <h3 className="margin-off review-title">
                                {title}
                              </h3>
                              <p className="margin-off">{comment}</p>
                              <div className="underline"></div>
                            </article>
                          );
                        })}
                      </section>
                    )}

                    <div className="btn-container">
                      <button
                        className="post-review-btn"
                        onClick={() => {
                          // navigate(`/products/feedback/${id}`);
                          navigate(`/products/feedback/${id}`, {
                            state: { single: location },
                            replace: true,
                          });
                        }}
                      >
                        Post A Review
                      </button>
                    </div>
                  </div>
                </article>
                <div className="product-navigate">
                  <h2>
                    {" "}
                    {/**  <HashLink to="/products/:selectedCategory/:product/:id#product-details">
                      Product Details
                    </HashLink>*/}
                    <a href="#product-details">Product Overview</a>
                  </h2>
                  <h2>
                    <a href="#product-specificaton">Product Features</a>{" "}
                    {/**  <HashLink to="/products/:selectedCategory/:product/:id#product-specificaton"> 
                      Product Specification
                    </HashLink>  */}
                  </h2>
                  <h2>
                    <a href="#product-review">Reviews</a>
                    {/** <HashLink to="/products/:selectedCategory/:product/:id#product-review">
                      Reviews
                    </HashLink>*/}
                  </h2>
                </div>
              </section>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
