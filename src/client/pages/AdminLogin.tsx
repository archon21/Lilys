import { observer } from "mobx-react";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Buttons, Inputs, Layout } from "../components";
import store from "../store";

interface Props {
  location?: any;
  history?: any;
}

const AdminLogin: React.FC<Props> = ({ location , history}) => {
  const [pageConfig, setPageConfig] = useState({
    mounted: false,
    fields: { email: "", password: "" },
  });

  const onChange = (event) => {
    setPageConfig({
      ...pageConfig,
      fields: { ...pageConfig.fields, [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = pageConfig.fields;
    await store.defaultUserHandler({ email, password, history });
  };

  return (
    <Layout.WindoW
      id="admin-login"
      init
      xAlign="center"
      yAlign="center"
      column
      background="backgroundSecondary">
      <Layout.Flex width="20em" column xAlign="center" yAlign="center">
        <form onSubmit={handleSubmit}>
          <Layout.Flex
            width="20em"
            margin="0 0 1em"
            column
            xAlign="center"
            yAlign="center">
            <Inputs.Field
              name="email"
              fieldType="text"
              placeholder="Email"
              value={pageConfig.fields.email}
              onChange={onChange}></Inputs.Field>
          </Layout.Flex>
          <Layout.Flex
            width="20em"
            margin="0 0 1em"
            column
            xAlign="center"
            yAlign="center">
            <Inputs.Field
              name="password"
              fieldType="text"
              type="password"
              placeholder="password"
              value={pageConfig.fields.password}
              onChange={onChange}></Inputs.Field>
          </Layout.Flex>
          <Buttons.Button variant="h4" onClick={null} type="submit">
            Login
          </Buttons.Button>
        </form>
      </Layout.Flex>
    </Layout.WindoW>
  );
};

export default withRouter(observer(AdminLogin))
