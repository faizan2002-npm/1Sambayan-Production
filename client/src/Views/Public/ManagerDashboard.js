import UserLayout from "../../layouts/User/UserLayout";
import { useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import {
  CardBody,
  Col,
  Container,
  Row,
  Label,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { postRequestForm } from "../../api/request";
import { Button, Image } from "react-bootstrap";
import { toast } from "react-toastify";
const ManagerDashboard = () => {
  const history = useHistory();
  const [postImage, setPostImage] = useState({});
  const changeFeaturedImage = (event) => {
    setPostImage({
      image: event.target.files[0],
      defaultImage: URL.createObjectURL(event.target.files[0]),
    });
  };
  const addSliderHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target[0].value);
    formData.append("description", e.target[1].value);
    formData.append("image", postImage?.image);
    formData.append("isApproved", false);
    formData.append("isAdmin", false);
    const token = localStorage.getItem("TOKEN");
    try {
      const response = await postRequestForm(
        "/api/secure/post/create",
        token,
        formData
      );
      console.log("status", response);
      if (response.result.status === 200) {
        toast.success("Post Created", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        window.location.assign("/account");
      }
    } catch (error) {
      console.log("Set Profile APi error", error.message);
    }
  };
  return (
    <UserLayout>
      <main id="main_content">
        <section className="latest_posts bg-white v2 mt-5">
          <Container>
            <Row className="justify-content-center">
              <Col className="col-lg-10 col-md-10 col-12">
                <h1 className="text-center">Manager Dashboard</h1>
                <Row className="justify-content-center">
                  <Col lg={6} md={8} xs={12}>
                    <div className="form_box">
                      <Form
                        className="form"
                        encType="multipart/form-data"
                        method="post"
                        onSubmit={addSliderHandler}
                      >
                        <Row>
                          <Col xs={12}>
                            <FormGroup className="mb-3">
                              <Label>Title</Label>
                              <Input
                                name="title"
                                type="text"
                                placeholder="Name"
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12}>
                            <FormGroup className="mb-3">
                              <Label>Content</Label>
                              <Input
                                name="description"
                                type="textarea"
                                placeholder="Content"
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12}>
                            <FormGroup className="mb-3">
                              <Label>Featured Image</Label>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={changeFeaturedImage}
                                className="form-control"
                              />
                              {postImage?.defaultImage ? (
                                <Image
                                  src={postImage.defaultImage}
                                  alt="profils pic"
                                  fluid
                                />
                              ) : (
                                ""
                              )}
                            </FormGroup>
                          </Col>
                          <Col className="text-center mt-5" xs={12}>
                            <Button type="submit" color="success">
                              Save
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="text-center">
                <Link to="/account" className="btn ">
                  Back
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </UserLayout>
  );
};

export default ManagerDashboard;
