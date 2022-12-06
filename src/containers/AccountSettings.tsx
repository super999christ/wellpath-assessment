import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ChangePasswordField from "../components/elements/ChangePasswordField";

// FRONTEND ONLY CODING CHALLENGE FILE
function AccountSettings(props: { passwordUpdateSuccess: boolean }): JSX.Element {
  const [users] = useState([
    {
      fields: {
        first_name: "Olive",
        last_name: "Yew",
        email: "yew@endla.com",
      },
    },
    {
      fields: {
        first_name: "Aida",
        last_name: "Bugg",
        email: "bugg@endla.com",
      },
    },
  ]);

  const [user] = useState({
    first_name: "Sam",
    last_name: "Smith",
    email: "sam@endla.com",
    username: "sam@endla.com",
    permission_list: {
      "permission 1": "enabled",
      "permission 2": "disabled",
    },
    id: 1,
  });

  const [userModalShown, setUserModalShown] = useState(false);
  const [inputs, setInputs] = useState({});
  const [validations, setValidations] = useState({
    current: false,
    password: false,
    password2: false,
  });

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "current") {
      setValidations((values) => ({
        ...values,
        current: value.length > 0,
      }));
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputs);
  };

  const removeUser = (userId: any) => {
    alert("User removed");
    console.log(userId);
  };

  const passwordChanged = (field: any) => (state: any) => {
    setValidations((values) => ({
      ...values,
      [field]: state.errors.length === 0,
    }));
    setInputs((values) => ({ ...values, [field]: state.value }));
  };

  return (
    <>
      <div className="container p-3">
        <h1 className="display-4">Account Settings</h1>
        <p className="lead">
          We always appreciate feedback - if you have chance leave us some, it
          helps us continue to improve.
        </p>
      </div>
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-4 fw-bold">Name</div>
            <div className="col">
              {user.first_name} {user.last_name}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4 fw-bold">Email</div>
            <div className="col">{user.email}</div>
          </div>
          <div className="row">
            <div className="col-md-2 col-4 fw-bold">Username</div>
            <div className="col">{user.username}</div>
          </div>
        </div>

        <hr />
        <div className="container">
          <h5>Features</h5>
          {Object.keys(user.permission_list).map((permission, index) => (
            <div className="row" key={index}>
              <div className="col-md-2 col-4 fw-bold">{permission}</div>
              <div className="col">
                {"enabled"}
              </div>
            </div>
          ))}
        </div>

        <hr />
        <div className="container">
          <h5>Change password</h5>

          <form onSubmit={(e) => onSubmit(e)} className="px-3 py-3">
            <div className="form-group mb-3">
              <label className="control-label mb-2">Current</label>
              <input
                name="current"
                type="password"
                id="current"
                className="form-control"
                placeholder="Enter current password"
                onChange={handleFormChange}
                required
                autoFocus />
            </div>

            <ChangePasswordField
              onPasswordChanged={passwordChanged("password")}
              onPassword2Changed={passwordChanged("password2")} />

            <div className="form-group row">
              <div className="col-md-auto">
                <button
                  className="btn btn-sm btn-primary btn-block"
                  type="submit"
                  disabled={!validations.current ||
                    !validations.password ||
                    !validations.password2}
                >
                  Save Changes
                </button>
              </div>
              {props.passwordUpdateSuccess && "Password successfully updated."}
            </div>
          </form>
        </div>

        <hr />
        <div className="container">
          <h5 className="mb-3">Edit Users</h5>
          <button
            className="btn btn-primary"
            onClick={() => setUserModalShown(true)}
          >
            Add User
          </button>

          {users.length ? (
            <table className="mt-4 table table-bordered">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td> {user.fields.first_name}</td>
                    <td> {user.fields.last_name}</td>
                    <td> {user.fields.email}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => removeUser(user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You have no users. Add a user to get started!</p>
          )}
        </div>
      </div>

      <Modal
        show={userModalShown}
        onHide={() => setUserModalShown(false)}
        animation={true}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstname"
                name="first_name"
                placeholder="Please enter a first name"
                onChange={handleFormChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastname"
                name="last_name"
                placeholder="Please enter a last name"
                onChange={handleFormChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Please select a email"
                onChange={handleFormChange}
                required />
            </Form.Group>
            {/* @ts-expect-error: type too complex to handle */}
            <Button type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountSettings;
