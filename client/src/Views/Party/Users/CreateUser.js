import PartyHeader from '../../../components/Party/PartyHeader'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { postRequest } from './../../../api/request';
import { useState } from 'react';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import Select from 'react-select'
import { toast } from 'react-toastify';
import { CardBody, FormGroup, Label } from 'reactstrap';
import { Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

export const CreateUser = () => {
    const [changeAge, setChangeAge] = useState()
    const [changeProfession, setChangeProfession] = useState()
    const ageOptions = [
        { value: '15', label: '15' },
        { value: '16', label: '16' },
        { value: '17', label: '17' },
        { value: '18', label: '18' },
        { value: '19', label: '19' },
        { value: '20', label: '20' },
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
        { value: '29', label: '29' },
        { value: '30', label: '30' },
        { value: '31', label: '31' },
        { value: '32', label: '32' },
        { value: '33', label: '33' },
        { value: '34', label: '34' },
        { value: '35', label: '35' },
        { value: '36', label: '36' },
        { value: '37', label: '37' },
        { value: '38', label: '38' },
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' },
        { value: '42', label: '42' },
        { value: '43', label: '43' },
        { value: '44', label: '44' },
        { value: '45', label: '45' },
        { value: '46', label: '46' },
        { value: '47', label: '47' },
        { value: '48', label: '48' },
        { value: '49', label: '49' },
        { value: '50', label: '50' },
        { value: '51', label: '51' },
        { value: '52', label: '52' },
        { value: '53', label: '53' },
        { value: '54', label: '54' },
        { value: '55', label: '55' },
        { value: '56', label: '56' },
        { value: '57', label: '57' },
        { value: '58', label: '58' },
        { value: '59', label: '59' },
        { value: '60', label: '60' },
        { value: '61', label: '61' },
        { value: '62', label: '62' },
        { value: '63', label: '63' },
        { value: '64', label: '64' },
        { value: '65', label: '65' },
        { value: '66', label: '66' },
        { value: '67', label: '67' },
        { value: '68', label: '68' },
        { value: '69', label: '69' },
        { value: '70', label: '70' },
        { value: '71', label: '71' },
        { value: '72', label: '72' },
        { value: '73', label: '73' },
        { value: '74', label: '74' },
        { value: '75', label: '75' },
        { value: '76', label: '76' },
        { value: '77', label: '77' },
        { value: '78', label: '78' },
        { value: '79', label: '79' },
        { value: '80', label: '80' },
        { value: '81', label: '81' },
        { value: '82', label: '82' },
        { value: '83', label: '83' },
        { value: '84', label: '84' },
        { value: '85', label: '85' },
        { value: '86', label: '86' },
        { value: '87', label: '87' },
        { value: '88', label: '88' },
        { value: '89', label: '89' },
        { value: '90', label: '90' },
        { value: '91', label: '91' },
        { value: '92', label: '92' },
        { value: '93', label: '93' },
        { value: '94', label: '94' },
        { value: '95', label: '95' },
        { value: '96', label: '96' },
        { value: '97', label: '97' },
        { value: '98', label: '98' },
        { value: '99', label: '99' },
        { value: '100', label: '100' },
    ]
    const professionOptions = [
        { value: 'Self Employed', label: 'Self Employed' },
        { value: 'Government', label: 'Government' }
    ]
    const ageChange = (selectedOption) => {
        setChangeAge(selectedOption);
    }
    const professionChange = (selectedOption) => {
        setChangeProfession(selectedOption);
    }
    const signUpHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "firstName",
            e.target[0].value
        );
        formData.append(
            "middleName",
            e.target[1].value
        );
        formData.append(
            "lastName",
            e.target[2].value
        );
        formData.append(
            "email",
            e.target[3].value
        );
        formData.append(
            "phone",
            e.target[4].value
        );
        if (changeAge) {
            formData.append(
                "age",
                changeAge.value
            );
        }
        formData.append(
            "address",
            e.target[6].value
        );
        formData.append(
            "fbLink",
            e.target[7].value
        );
        if (changeProfession) {
            formData.append(
                "profession",
                changeProfession.value
            );
        }
        formData.append(
            "partyId",
            localStorage.getItem("PARTY_ID")
        );
        formData.append(
            "password",
            e.target[9].value
        );
        formData.append(
            "confirm_password",
            e.target[9].value
        );
        const APIresponse = {
            firstName: formData.get('firstName'),
            middleName: formData.get('middleName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone').replace(/-|\s/g, ""),
            age: formData.get('age'),
            address: formData.get('address'),
            fbLink: formData.get('fbLink'),
            profession: formData.get('profession'),
            partyId: formData.get('partyId'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        };
        try {
            const response = await postRequest(
                "/api/pub/auth/register",
                APIresponse,
            );
            if (response.result.status === 200) {
                toast.success('User Created', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                window.location.assign('/party/ListUsers');
            }
        } catch (error) {
            console.log("Set Profile APi error", error.message);
        }
    }
    return (
        <>
            <PartyHeader />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardBody>
                                <AvForm className="form" encType="multipart/form-data" method="post" onValidSubmit={signUpHandler}>
                                    <Row>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>First Name</Label>

                                                <AvField
                                                    name="firstName"
                                                    type="text"
                                                    placeholder="First Name"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Middle Name</Label>

                                                <AvField
                                                    name="middleName"
                                                    type="text"
                                                    placeholder="Middle Name"
                                                    className="form-control"
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Last Name</Label>

                                                <AvField
                                                    name="lastName"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Email</Label>

                                                <AvField
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Phone Number</Label>

                                                <PhoneInput
                                                    country={'ph'}
                                                    enableAreaCodes={true}
                                                    enableAreaCodeStretch
                                                    enableSearch={true}
                                                    inputProps={{
                                                        name: 'phone',
                                                        required: true,
                                                        autoFocus: true
                                                    }}
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Age</Label>


                                                <Select
                                                    onChange={ageChange}
                                                    options={ageOptions} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup>
                                                <Label>Address</Label>

                                                <AvField
                                                    name="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup>
                                                <Label>Facebook Link</Label>

                                                <AvField
                                                    name="fbLink"
                                                    type="url"
                                                    placeholder="Facebook Link"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup className="mb-4">
                                                <Label>Professional / Field of Experties</Label>
                                                <Select
                                                    onChange={professionChange}
                                                    options={professionOptions}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} md={6} xs={12}>
                                            <FormGroup>
                                                <Label>Password</Label>

                                                <AvField
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    className="form-control"
                                                    required
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="text-center">
                                                <Button className="mt-4" color="primary" type="submit">
                                                    Add User
                                                </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
