// import Header from "../../components/Admin/Headers/Header";
// import { Formik, Form, Field as Input, ErrorMessage } from "formik";

// import { Container, Card, Row, Col, CardBody, Label, FormGroup, Button } from 'reactstrap';
// import { getRequest } from "../../api/request";
// import React, { useState, useEffect } from 'react';
// import { putRequest } from '../../api/request';
// import FileUpload from "../../components/FileUpload";

// const OldEditProfile = () => {
//   const [profileData, setProfileData] = useState()
//   const getAdminProfile = async () => {
//     try {
//       const token = localStorage.getItem("TOKEN");
//       const response = await getRequest(
//         `/api/secure/user/profile`,
//         token
//       );
//       console.log("setProfileData", response);
//       setProfileData({
//         admin_firstName: response.result.data.user.firstName,
//         admin_lastName: response.result.data.user.lastName,
//         admin_email: response.result.data.user.email,
//         admin_phone: response.result.data.user.phone,
//         admin_pic: response.result.data.user.profileImage,
//       });
//       console.log("Get Profile Response", response.result);
//     } catch (error) {
//       console.log("Get Profile Error", error.message);
//     }
//   };
// const handleSubmit = (values) =>{
// console.log("values",values);
// }
//   useEffect(() => {
//     getAdminProfile();
//   }, []);
//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row className="mt-5">
//           <Col className="mb-5 mb-xl-0" xl="12">
//             <Card className="shadow">
//               <CardBody>

//                 <form encType="multipart/form-data" onSubmit={handleSubmit}>
//                   <Row>
//                     <Col lg={6} md={6} xs={12}>
//                       <FormGroup className="mb-3">
//                         <Label>First Name</Label>
//                         <Input
//                           name="admin_firstName"
//                           type="text"
//                           placeholder="Name"
//                           className="form-control" 
//                           // value={profileData.admin_firstName}
//                           />
//                       </FormGroup>
//                     </Col>
//                     <Col lg={6} md={6} xs={12}>
//                       <FormGroup className="mb-3">
//                         <Label>Last Name</Label>
//                         <Input
//                           name="admin_lastName"
//                           type="text"
//                           placeholder="Name"
//                           className="form-control"
//                           value={profileData.admin_lastName} />
//                       </FormGroup>
//                     </Col>
//                     <Col lg={6} md={6} xs={12}>
//                       <FormGroup className="mb-3">
//                         <Label>Email</Label>
//                         <Input
//                           name="admin_email"
//                           type="email"
//                           placeholder="Email Address"
//                           className="form-control"
//                           value={profileData.admin_email}  />
//                       </FormGroup>
//                     </Col>
//                     <Col lg={6} md={6} xs={12}>
//                       <FormGroup className="mb-3">
//                         <Label>Phone Number</Label>
//                         <Input
//                           name="admin_phone"
//                           type="tel"
//                           placeholder="Phone Number"
//                           className="form-control"
//                           value={profileData.admin_phone}  />
//                       </FormGroup>
//                     </Col>
//                     <Col lg={6} md={6} xs={12}>
//                       <FormGroup className="mb-3">
//                         <Label>Profile Pic</Label>
//                         <Input
//                           name="profileImage"
//                           type="file"
//                           onChange={e => {
//                             const file = e.currentTarget.files[0];
//                             const reader = new FileReader();
//                             reader.readAsDataURL(file);
//                           }}
//                           value={profileData.profileImage} 
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className="text-center mt-5" xs={12}>
//                       <Button type="submit" color="success" outline>
//                         Save
//                       </Button>
//                     </Col>
//                   </Row>
//                 </form>

//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }
// export default OldEditProfile;