import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import * as actions from "../actions/NamesListAction";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  Name: "",
  Group: "",
  IsEditing: false,
  Count: 0,
};

const ButtonGenerator = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "This field is required.";
    if ("Group" in fieldValues)
      temp.Group = fieldValues.Group ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values)
      return Object.values(temp).every((fieldValue) => fieldValue == "");
  };

  useEffect(() => {
    props.fetchAllNamesList();
  }, []); //componentDidMount

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  //const [buttons,setButtons] = useState(JSON.parse(localStorage.getItem('names')));

  let groupArray = [];
  for (const singleValue of Object.keys(props.NamesList)) {
    const singleGroup = props.NamesList[singleValue];
    if (!groupArray.includes(singleGroup.group)) {
      groupArray.push(singleGroup.group);
    }
  }

  const handleButtonSubmit = (values) => {
    props.createNamesList(values);
  };

  const handleIncrementCount = (item) => {
    props.incrementNamesList(item);
  };

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <>
      {groupArray.map((group, index) =>
      <>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><> {group} </></Typography>
        </AccordionSummary>
        <AccordionDetails>
            {props.NamesList.filter(item => item.group === group).map((item, index2) =>
          <Typography>
            <Button variant="contained"onClick={() => props.incrementNamesList(item)}>{item.name} ({item.count})</Button>
          </Typography>
          )}
          
        </AccordionDetails>
        </>
        )}
        </>
      </Accordion>
  );

  /*<ul>
            {groupArray.map((group, index) =>
                <li className="group ButtonWrapper" key={index}>
                    <h1>{group}</h1>
                    {props.NamesList.filter(item => item.group === group).map((item, index2) =>
                        <div key={index + '-' + index2}>
                            <button variant="contained" className="button" onClick={() => props.incrementNamesList(item)}>{item.name} ({item.count})</button>
                        </div>
                    )}
                </li>
            )}
        </ul>
    */
};

const mapStateToProps = (state) => ({
  NamesList: state.NamesListReducer.list,
});

const mapActionToProps = {
  createNamesList: actions.create,
  updateNamesList: actions.update,
  fetchAllNamesList: actions.fetchAll,
  deleteNamesList: actions.Delete,
  incrementNamesList: actions.counterIncrement,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ButtonGenerator));
