import { Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    id: "",
    courses: "react",
  });

  useEffect(() => {
    const res = async () => {
      let resp = await axios.get(
        "https://620737a992dd6600171c0d1c.mockapi.io/formik"
      );
      return setData(resp["data"]);
    };
    res();
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    id: "",
    courses: "node",
  };

  const validate = (formData) => {
    var errors = {};
    if (formData.firstName === "") {
      errors.firstName = "FirstName is required";
    }
    if (formData.lastName === "") {
      errors.lastName = "LastName is required";
    }
    if (formData.lastName === "") {
      errors.email = "email is required";
    }
    if (formData.gender === "") {
      errors.gender = "Gender is required";
    }
    if (formData.age === "") {
      errors.age = "Age is required";
    }

    return errors;
  };

  const deleteHandler = async (id) => {
    await axios.delete(
      `https://620737a992dd6600171c0d1c.mockapi.io/formik/${id}`
    );
    setData((prev) => prev.filter((ele, index) => ele["id"] !== id));
  };

  const editHandler = async (ele) => {
    setFormData((prev) => {
      let newState = { ...prev };
      newState["firstName"] = ele.firstName;
      newState["lastName"] = ele.lastName;
      newState["email"] = ele.email;
      newState["gender"] = ele.gender;
      newState["age"] = ele.age;
      newState["id"] = ele.id;
      newState["courses"] = ele.courses;
      return { ...newState };
    });
  };

  const onSubmit = async (formData, onSubmitProps) => {
    if (formData.id === "") {
      let temp;
      if (data.length > 0) {
        setId(Number(data[data.length - 1]["id"]) + 1);
        temp = Number(data[data.length - 1]["id"]) + 1;
      } else {
        setId(1);
        temp = 1;
      }
      await axios.post(
        "https://620737a992dd6600171c0d1c.mockapi.io/formik",
        formData
      );
      formData["id"] = temp;
      setData((prev) => {
        return [...prev, formData];
      });
    } else {
      console.log("inside ielse");
      await axios.put(
        `https://620737a992dd6600171c0d1c.mockapi.io/formik/${formData.id}`,
        formData
      );
      setData((prev) => {
        let newState = [...prev];
        let ind = newState.findIndex((ele) => ele.id === formData.id);
        newState[ind] = formData;
        return [...newState];
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        age: "",
        id: "",
        courses: "react",
      });
    }
    onSubmitProps.resetForm();
  };

  return (
    <div className="App">
      <Typography variant="h5">CRUD using Formik</Typography>
      <Formik
        initialValues={formData || initialValues}
        validate={(formData) => validate(formData)}
        onSubmit={(formData, onSubmitProps) =>
          onSubmit(formData, onSubmitProps)
        }
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValidating,
          isSubmitting,
        }) => (
          <Grid
            container
            xs={11}
            sm={9}
            md={5}
            sx={{
              margin: "auto",
              border: "2px solid black",
              borderRadius: 5,
              backgroundColor: "#ddd",
              justifyContent: "center",
            }}
            p={2}
          >
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <Typography>First Name</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "100%" }}
                />
                <br />
                <span style={{ color: "red" }}>
                  {touched.firstName && errors.firstName}
                </span>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <Typography>Last Name</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <span style={{ color: "red" }}>
                  {touched.lastName && errors.lastName}
                </span>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <Typography>E-mail</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <span style={{ color: "red" }}>
                  {touched.email && errors.email}
                </span>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <label>Gender</label>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.gender === "male" ? true : false}
                    />
                    Male
                  </Box>
                  <Box>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.gender === "female" ? true : false}
                    />
                    Female
                  </Box>
                </Box>
                <span style={{ color: "red" }}>
                  {touched.gender && errors.gender}
                </span>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <Typography>Age</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span style={{ color: "red" }}>
                  {touched.age && errors.age}
                </span>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
              }}
              mb={2}
            >
              <label>Courses</label>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <select
                  name="courses"
                  value={values.courses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="react">React</option>
                  <option value="node">Node</option>
                </select>
                <span style={{ color: "red" }}>{errors.courses}</span>
              </Box>
            </Grid>
            <Box sx={{ display: "flex", gap: 5 }}>
              <Button
                type="submit"
                onClick={() => handleSubmit()}
                variant="contained"
              >
                Submit
              </Button>
              <Button type="button" variant="contained">
                Cancel
              </Button>
            </Box>
          </Grid>
        )}
      </Formik>
      <Typography>RECORDS</Typography>
      <Typography
        variant="p"
        style={{ color: "red" }}
        display={{ xs: "block", sm: "block", md: "none" }}
      >
        Slide to scroll
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "scroll",
          margin: "auto",
          justifyContent: "center",
        }}
        px={2}
      >
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Courses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.email}</td>
                <td>{ele.gender}</td>
                <td>{ele.age}</td>
                <td>{ele.courses}</td>
                <td style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => editHandler(ele)}>Edit</button>
                  <button onClick={() => deleteHandler(ele.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

export default App;
