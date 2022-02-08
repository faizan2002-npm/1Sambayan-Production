import UserLayout from "../../layouts/User/UserLayout";
import { Link } from "react-router-dom";
import Select from "react-select";
import React from "react";
import { Card, CardBody, CardTitle,Col, Container, FormGroup, Form, Input, Label, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { getRequest, postRequestForm, putRequest } from "../../api/request";
import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import moment from "moment";
import * as _ from "underscore";

const ExpandedComponent = ({ data }) => {
  const [approver, setApprover] = useState();

  const approverChange = (selectedOption) => {
    setApprover(selectedOption);
  };
  const [defaultData, setDefaultSlideData] = useState({
    title: data.title,
    description: data.description,
    image: "https://sambayan-1.s3.ap-south-1.amazonaws.com/" + data.image,
    backgroundImage:
      "https://sambayan-1.s3.ap-south-1.amazonaws.com/" + data.backgroundImage,
  });
  const [featuredImage, setFeaturedImage] = useState({
    image: data.image,
    defaultImage: defaultData.image,
  });
  const [backgroundImage, setBackgroundImage] = useState({
    backgroundImage: data.backgroundImage,
    defaultbackgroundImage: defaultData.backgroundImage,
  });
  const changeFeaturedImage = (event) => {
    setFeaturedImage({
      image: event.target.files[0],
      defaultImage: URL.createObjectURL(event.target.files[0]),
    });
  };
  const updateSlideHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    formData.append("title", e.target[0].value);
    formData.append("description", e.target[1].value);
    formData.append("image", featuredImage.image);
    formData.append("postId", data._id);
    if (approver) {
      formData.append("isApproved", approver.value);
    }

    const token = localStorage.getItem("TOKEN");
    try {
      const response = await putRequest(
        "/api/secure/post/update",
        token,
        formData
      );

      console.log("status", response);
      if (response.result.status === 200) {
        toast.success("Post Updated", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("Set Site Setting error", error.message);
    }
  };
  return (
    <>
      <Form
        className="form"
        encType="multipart/form-data"
        method="post"
        onSubmit={updateSlideHandler}
      >
        <Row className="m-0">
          <Col xs={12} className="my-3">
            <h2>Edit Post {data.title}</h2>
          </Col>
          <Col xs={12}>
            <FormGroup className="mb-3">
              <Label>Title</Label>
              <Input
                name="title"
                type="text"
                placeholder="Name"
                className="form-control"
                defaultValue={data.title}
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
                defaultValue={data.description}
              />
            </FormGroup>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <FormGroup className="mb-3">
              <Label>Featured Image</Label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={changeFeaturedImage}
                className="form-control"
              />
              {featuredImage.defaultImage ? (
                <Image
                  src={featuredImage.defaultImage}
                  alt="profils pic"
                  fluid
                />
              ) : (
                ""
              )}
            </FormGroup>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <FormGroup className="mb-4">
              <Label>Approved</Label>
              <Select
                onChange={approverChange}
                defaultValue={{
                  value: true,
                  label: data?.isApproved ? "Approved" : "Not Approved",
                }}
                options={[
                  { value: false, label: "Not Approved" },
                  { value: true, label: "Approved" },
                ]}
              />
            </FormGroup>
          </Col>
          <Col className="text-center mt-5" xs={12}>
            <Button type="submit" color="success">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </Formik> */}
    </>
  );
};

const ApproverDashboard = () => {
  const [allPosts, setAllPosts] = useState();
  const [todayPosts, setTodayPosts] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [notApprovedPosts, setNotApprovedPosts] = useState();
  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [tableHead, setTableHead] = useState();
  const [tableData, setTableData] = useState();
  const getAllPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/list-by-party/${localStorage.getItem("PARTY_ID")}`,
        token
      );
      setTableData(response.result.data.posts);
      setAllPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const deleteSinglePost = async (postId, row, index, column, id) => {
    // console.log("row",row);
    // console.log("index", index);
    // console.log("column",column);
    // console.log("id", id);

    // console.log("column",column);
    // console.log("id", id);
    try {
      const token = localStorage.getItem("TOKEN");
      // console.log("id request to delete the post", postId);
      // var params = props.location.search.slice(5);
      const response = await postRequestForm(
        `/api/secure/post/delete-post`,
        token,
        { postId }
      );
      // console.log(response);
      if (response.result.status === 200) {
        toast.success("Post Deleted", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        var fadeTarget = document.querySelector(
          `.rdt_Table .rdt_TableRow#row-${index}`
        );
        var fadeEffect = setInterval(function () {
          if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
          }
          if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
          } else {
            if (fadeTarget.style.opacity == 0) {
              fadeTarget.style.display = "none";
              clearInterval(fadeEffect);
            }
          }
        }, 5);
      }
    } catch (error) {
      toast.success(error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const getTodayPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/today-post/${localStorage.getItem("PARTY_ID")}`,
        token
      );
      setTodayPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getApprovedPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/approved-by-party/${localStorage.getItem(
          "PARTY_ID"
        )}`,
        token
      );
      setApprovedPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getNotApprovedPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/unapproved-by-party/${localStorage.getItem(
          "PARTY_ID"
        )}`,
        token
      );
      setNotApprovedPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getPageTitle = (routes) => {
    return (
      <Row className="mb-5">
        <Col lg="6" xl="3">
          <Card className="card-stats bg-white mb-4 mb-xl-0">
            <CardBody className="p-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    All Posts
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{allPosts}</span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-chart-bar" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats bg-white mb-4 mb-xl-0">
            <CardBody className="p-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Today's Posts
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{todayPosts}</span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-chart-pie" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats bg-white mb-4 mb-xl-0">
            <CardBody className="p-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Approved Posts
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">
                    {approvedPosts}
                  </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                    <i className="fas fa-users" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats bg-white mb-4 mb-xl-0">
            <CardBody className="p-3">
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    Not Approved Posts
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">
                    {notApprovedPosts}
                  </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                    <i className="fas fa-percent" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  useEffect(() => {
    getTodayPosts();
    getApprovedPosts();
    getNotApprovedPosts();
    const timeout = setTimeout(() => {
      getAllPosts();
      setTableHead([
        {
          name: "Title",
          sortable: true,
          selector: (row) => row.title,
        },
        {
          name: "Date",
          id: "data_sort",
          sortable: true,
          selector: (row) => moment(row.createdAt).format("dddd, MMMM Do YYYY"),
        },
      ]);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <UserLayout>
      <main id="main_content">
        <section className="latest_posts   v2 mt-5">
        <Container fluid className="px-5">
        <h1 className="text-center">Approver Dashboard</h1>
                {getPageTitle()}
        </Container>
          <Container>
          
            <Row className="justify-content-center">
              <Col lg={10} md={10} xs={12}>
               
                <DataTable
                  columns={tableHead}
                  data={_.sortBy(tableData, "total").reverse()}
                  expandableRows
                  style={{
                    borderRadius: "5px",
                  }}
                  defaultSortAsc={false}
                  defaultSortFieldId="cell-data_sort-undefined"
                  // onSort={handleSort}
                  // theme="dark"
                  // expandableCloseAllOnExpand={true}
                  pagination
                  expandableRowsComponent={ExpandedComponent}
                  progressPending={pending}
                  expandableIcon={{
                    collapsed: <FontAwesomeIcon icon={faPencilAlt} />,
                    expanded: <FontAwesomeIcon icon={faPencilAlt} />,
                  }}
                />
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

export default ApproverDashboard;
