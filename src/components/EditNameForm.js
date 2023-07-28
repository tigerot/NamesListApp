import React, { useState, useEffect } from "react";
import NameWrapperForm from "./NameWrapperForm";
import * as actions from "../actions/NamesListAction";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useToasts } from "react-toast-notifications";
import useForm from "./useForm";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const initialFieldValues = {
  Name: "",
  Group: "",
  IsEditing: false,
  Count: 0,
};

const EditNameForm = ({ classes, ...props }) => {
  //const [currentId, setCurrentId] = useState(0);
  const [nameId, setNameId] = useState(0);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [names, setNames] = useState([]);

  /*useEffect(() => {
    props.fetchAllNamesList();
  }, []);

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.NamesList.find((x) => x.NameId == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);*/

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:1453/api/Names/getall");
    setNames(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:1453/api/Names/add", {
        name: name,
        group: group,
      });
      alert("Registration Successful");
      setNameId("");
      setName("");
      setGroup("");

      Load();
    } catch (error) {
      alert(error);
    }
  }
  async function editName(names) {
    setName(names.name);
    setGroup(names.group);
    setNameId(names.nameId);
  }

  async function DeleteName(names) {
    console.log(names);
    editName(names);
    console.log(name);
    await axios.delete("http://localhost:1453/api/Names/delete", {
      data: {
        nameId: names.nameId,
        name: names.name,
        group: names.group,
      },
    });
    alert("Deleted Successfully");
    setNameId("");
    setName("");
    setGroup("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:1453/api/Names/update", {
        nameId: nameId,
        name: name,
        group: group,
      });
      alert("Registration Updated");
      setNameId("");
      setName("");
      setGroup("");

      Load();
    } catch (error) {
      alert(error);
    }
  }

  const onDelete = (values) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteNamesList(values, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      //props.createNamesList(values, onSuccess)
      if (props.currentId == 0) props.createNamesList(values, onSuccess);
      else props.updateNamesList(props.currentId, values, onSuccess);
    }
  };

  //toast msg.
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "This field is required.";
    if ("Group" in fieldValues)
      temp.Group = fieldValues.Group ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={12}> <img src="Teknim.png" alt="Teknim Logo"/> </Grid>
        <Grid item xs={6}>
          <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  name="Name"
                  variant="outlined"
                  label="Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  {...(errors.fullName && {
                    error: true,
                    helperText: errors.fullName,
                  })}
                />
                <TextField
                  name="Group"
                  variant="outlined"
                  label="Group"
                  value={group}
                  onChange={(event) => {
                    setGroup(event.target.value);
                  }}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                    onClick={save}
                  >
                    ekle
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                    onClick={update}
                  >
                    güncelle
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.smMargin}
                    onClick={resetForm}
                  >
                    reset
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.smMargin}
                    onClick={() => window.open("/buttons")}
                  >
                    calistir
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {names.map(function fn(record, index) {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.group}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => editName(record)}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => DeleteName(record)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  NamesList: state.NamesListReducer.list,
});

const mapActionToProps = {
  createNamesList: actions.create,
  updateNamesList: actions.update,
  fetchAllNamesList: actions.fetchAll,
  deleteNamesList: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditNameForm));
