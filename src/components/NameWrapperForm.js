import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as actions from "../actions/NamesListAction";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
uuidv4();

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})


const initialFieldValues = {
    Name: '',
    Group: '',
    IsEditing: false,
    Count: 0
}

const NameWrapperForm = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllNamesList()
    }, [])

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.NamesList.find(x => x.NameId == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const onDelete = values => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteNamesList(values,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Group' in fieldValues)
            temp.Group = fieldValues.Group ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
                //props.createNamesList(values, onSuccess)
                if (props.currentId == 0)
                    props.createNamesList(values, onSuccess)
                else
                    props.updateNamesList(props.currentId, values, onSuccess)
        }
    }

  return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="Name"
                        variant="outlined"
                        label="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="Group"
                        variant="outlined"
                        label="Group"
                        value={values.Group}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            ekle/degistir
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
                            onClick={() => window.open('/buttons')}
                        >
                            calistir
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
          )
        }

const mapStateToProps = state => ({
    NamesList: state.NamesListReducer.list
})

const mapActionToProps = {
    createNamesList: actions.create,
    updateNamesList: actions.update,
    fetchAllNamesList: actions.fetchAll,
    deleteNamesList: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(NameWrapperForm));


    /*<div className='NameWrapper'>
        <h1>isim listesi</h1>
        <div className={"NameWrapper"}>
            <form onSubmit={handleSubmit} className="NameForm">
                <input name="group" type="text" value={values.Group} onChange={handleInputChange} className="group-input" placeholder='Lütfen bulunacağı grubu girin:' />
                <input name="name" type="text" value={values.Name} onChange={handleInputChange} className="name-input" placeholder='Lütfen bir isim girin:'/>
                <button variant="contained" type="submit" className='name-btn'>ekle</button>
                <button variant="contained" type="submit" className='run-btn' onClick={() => window.open('/buttons')}>calistir</button>
            </form>
        </div>
    </div>*/


/*{props.NamesList.map((value, index) => (
    isEditing == true (
        <div className="Name" key={index}>
            <p>{value.name}</p>
            <div>
                <FontAwesomeIcon type="submit" icon={faPenToSquare} onClick={() => { setCurrentId(value.id), setIsEditing(true) }} />
                <FontAwesomeIcon icon={faTrash} onClick={() =>  onDelete(value)} />
            </div>
        </div>
    )
))}*/