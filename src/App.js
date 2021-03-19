import "./App.css";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import Detail from "./pages/Detail";
import { Home } from "./pages/HomePage";

function App() {
  const localData = require("./response.json");
  const [tableData, setTableData] = useState([]);
  const [isMainPage, setMainPage] = useState(true);
  const [record, setRecord] = useState({});

  const handleGetData = () => {
    setTableData(localData);
  };

  const handleGoToDetail = (record) => {
    setRecord(record);
    setMainPage(false);
  };
  const handleGoToHome = () => {
    setMainPage(true);
  };

  const handleChangeData = (e) => {
    if (e === "") return handleGetData();
    else {
      const selectArray = localData.filter(
        (world) =>
          world.firstname.toLocaleLowerCase().includes(e.toLocaleLowerCase()) ||
          world.surname.toLocaleLowerCase().includes(e.toLocaleLowerCase()) ||
          world.email.toLocaleLowerCase().includes(e.toLocaleLowerCase())
      );
      return setTableData(selectArray);
    }
  };
  const handleAddUser = (value) => {
    const allIds = tableData.map((x) => x._id);
    const maxId = Math.max(...allIds);
    value["_id"] = maxId + 1;
    tableData.push(value);
  };
  const handleEditUser = (value) => {
    let tempData = tableData.filter((x) => x._id !== value._id);
    const editUser = tableData.find((world) => world._id === value._id);
    if (value.firstname !== undefined) editUser["firstname"] = value.firstname;
    if (value.surname !== undefined) editUser["surname"] = value.surname;
    if (value.birthdate !== undefined) editUser["birthdate"] = value.birthdate;
    if (value.email !== undefined) editUser["email"] = value.email;
    if (value.avatar !== undefined) editUser["avatar"] = value.avatar;

    tempData.push(editUser);
    setTableData(tempData);
  };
  const handleDeleteUser = (userId) => {
    let tempData = tableData.filter((x) => x._id !== userId);
    setTableData(tempData);
    handleGoToHome();
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const Container = styled.div`
    width: 100%;
    text-align: center;
  `;
  return (
    <React.Fragment>
      <Container>
        {isMainPage ? (
          <Home
            data={tableData}
            goToDetail={handleGoToDetail}
            changeData={handleChangeData}
          />
        ) : (
          <Detail
            data={record}
            goToHome={handleGoToHome}
            deleteUser={handleDeleteUser}
            addUser={handleAddUser}
            editUser={handleEditUser}
            getData={handleGetData}
          />
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;
