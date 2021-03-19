import React from "react";
import { Table, Input, Space } from "antd";

const BirthdateToAge = (birthdate) => {
  const birthday = new Date(birthdate);
  const monthDiff = Date.now() - birthday.getTime();
  const ageDt = new Date(monthDiff);
  const year = ageDt.getUTCFullYear();
  const age = Math.abs(year - 1970);
  return age;
};

function Home(props) {
  const { Search } = Input;

  const searchMe = (e) => {
    props.changeData(e);
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "firstname",
      key: "firstname",
      sorter: {
        compare: (a, b) => a.firstname.localeCompare(b.firstname),
      },
    },
    {
      title: "Last name",
      dataIndex: "surname",
      key: "surname",
      sorter: {
        compare: (a, b) => a.surname.localeCompare(b.surname),
      },
    },
    {
      title: "Age",
      dataIndex: "birthdate",
      sorter: (a, b) =>
        BirthdateToAge(a.birthdate) - BirthdateToAge(b.birthdate),
      render: (birthdate) => {
        if (BirthdateToAge(birthdate) < 18) {
          return (
            <div
              style={{
                color: "red",
              }}
            >
              {BirthdateToAge(birthdate)}
            </div>
          );
        } else {
          return <div>{BirthdateToAge(birthdate)}</div>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "",
      render: (text, record) => (
        <button onClick={() => props.goToDetail(record)}>Detail</button>
      ),
    },
  ];

  return (
    <div className="App">
      <h1>User management</h1>
      <Table
        rowKey={(record) => record.firstname}
        columns={columns}
        dataSource={props.data}
      />
      <Space direction="vertical">
        <Search
          placeholder="Hľadať"
          onSearch={(e) => searchMe(e)}
          enterButton
        />
      </Space>
    </div>
  );
}

export { Home, BirthdateToAge };
