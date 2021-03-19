import React, { useState } from "react";
import styled from "styled-components";
import { BirthdateToAge } from "./HomePage";
import { Form, Input, Upload, Modal, Button, Avatar, DatePicker } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";

function getBase64(img) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
}

export default function Detail(props) {
  const [visible, setVisible] = React.useState(false);
  const [isSaveForm, setSaveForm] = useState("");
  const user = props.data;
  const [form] = Form.useForm();
  const userAge = BirthdateToAge(user.birthdate);
  let avatar = "";
  if (user.avatar === "" || user.avatar === undefined) {
    avatar = <Avatar shape="square" size={200} icon={<UserOutlined />} />;
  } else {
    avatar = (
      <img src={user.avatar} width="200" height="200" alt={user.firstname} />
    );
  }

  const onFinish = (value) => {
    const birthday = value.birthdate.format("YYYY-MM-DD");
    value.birthdate = birthday;
    value.avatar = value.avatar.file.xhr.responseURL;
    if (isSaveForm === "add") {
      props.addUser(value);
    }
    if (isSaveForm === "edit") {
      value["_id"] = user._id;
      props.editUser(value);
    }
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  const deleteUser = () => {
    return setVisible(true);
  };
  const modalCancel = () => {
    setVisible(false);
  };
  const modalOk = () => {
    props.deleteUser(user._id);
    setVisible(false);
  };
  const onFill = () => {
    form.setFieldsValue({
      firstname: user.firstname,
      surname: user.surname,
      birthdate: moment(user.birthdate),
      email: user.email,
    });
  };
  //                STYLED COMPONENT
  const Profile = styled.div`
    width: 50rem;
    text-align: left;
    padding: 1rem;
    margin: 2rem auto;
    border: 1px solid black;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    display: flex;
  `;
  const Image = styled.div`
    width: 15rem;
    text-align: left;
    padding: 2rem;
  `;
  const Info = styled.div`
    width: 25rem;
    text-align: left;
    padding: 2rem;
  `;
  const MyForm = styled(Form)`
    width: 50rem;
    margin: 2rem auto;
  `;
  const MyButton = styled(Button)`
    margin: 0.5rem;
  `;
  return (
    <React.Fragment>
      <h1>Detail</h1>
      <Profile>
        <Image>{avatar}</Image>
        <Info>
          <h2>First name: {user.firstname}</h2>
          <h2>Last name: {user.surname}</h2>
          <h2>Birthdate: {user.birthdate}</h2>
          <h2>Age: {userAge} years</h2>
          <h2>Email: {user.email}</h2>
        </Info>
      </Profile>
      <MyButton
        onClick={() => {
          form.resetFields();
          setSaveForm("add");
        }}
      >
        Add User
      </MyButton>
      <MyButton
        onClick={() => {
          setSaveForm("edit");
          onFill();
        }}
      >
        Edit User
      </MyButton>
      <MyButton danger onClick={() => deleteUser()}>
        Delete User
      </MyButton>
      <MyButton type="primary" onClick={() => props.goToHome()}>
        Back to Table
      </MyButton>
      {isSaveForm !== "" && (
        <MyForm onFinish={onFinish} {...layout} form={form}>
          <Form.Item name="firstname" label="First name" key={user._id}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Last name">
            <Input />
          </Form.Item>
          <Form.Item name="birthdate" label="Birthdate">
            <DatePicker style={{ width: "100%" }} placeholder="" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="avatar" {...tailLayout}>
            <Upload fileList={Input.value} action={(file) => getBase64(file)}>
              <Button icon={<UploadOutlined />}>Click to Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={() => {}}>
              Submit
            </Button>
          </Form.Item>
        </MyForm>
      )}
      <Modal
        title="Title"
        visible={visible}
        onOk={modalOk}
        onCancel={modalCancel}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </React.Fragment>
  );
}
