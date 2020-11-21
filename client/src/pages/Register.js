import { gql, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
function Register(props) {
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.logout(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Grid centered columns={3}>
      <Grid.Row columns={3} style={{ marginTop: 20 }}>
        <Grid.Column>
          <h3>Register</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              value={values.username}
              onChange={onChange}
              error={errors.username ? true : false}
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              error={errors.email ? true : false}
              value={values.email}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              error={errors.password ? true : false}
              type="password"
              value={values.password}
              onChange={onChange}
            />
            <Form.Input
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              error={errors.confirmPassword ? true : false}
              type="password"
              value={values.confirmPassword}
              onChange={onChange}
            />
            <Button type="submit" primary>
              Register
            </Button>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
