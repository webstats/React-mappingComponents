import React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function handleCancel() {
  const win1 = document.getElementById("win1");
  const win3 = document.getElementById("win3");
  win1 && win1.setAttribute("style", "position:relative; z-index:-2; left:20000px");
  win3 && win3.setAttribute("style", "position:relative; z-index:-1; left:20000px");

}

function InputEmptyProfile(params) {
  const data = params.Data;
  let relation = params.Relation;
  let [gender, setGender] = React.useState(null);

  function handleGenderChange(event) {
    console.log("Gender? "+event.target.value)
    setGender(event.target.value);
  }

  if (gender == null) {
    if(relation == 'father') {
        setGender('true');
    } else if (relation == 'spouse') {
        setGender(String(!data.isMale));
    } else {
      setGender('true')
    }
  }

  let url = '//localhost:8000/add/'+relation+"?id="+data._id;

  //if add child to female, add under her husband. InputRelation eliminated scenario of adding child to single female.
  if((relation == 'child') && (!data.isMale)) {
    url = '//localhost:8000/add/child?id='+data.couple[data.couple.length-1];
  }


  return(<Box component="form"
              sx={{'& .MuiTextField-root': { m: 1, width: '30ch' }, flexGrow:1 }}
              noValidate
              autoComplete="off"
              action={url}
              method="post"
              >
      <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="fName"
              name="fName"
              label="First Name"
               />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
                id="lName"
                name="lName"
                label="Last Name"
                />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
                id="birthdate"
                name="birthdate"
                label="Birthdate"
                variant="standard"
                defaultValue="12/30/2000"
                />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                value={gender}
                name="isMale"
                onChange={handleGenderChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="Male"  />
                <FormControlLabel value="false" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="country"
              name="country"
              label="Country of residence"
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
                id="address"
                name="address"
                label="Address or Township"
                multiline
                maxRows={4}
                />
          </Grid>
          <Grid item xs={12} md={6}>
            <input type="hidden" name="fatherID" value="" />
            <Alert severity="info">Click save to add {relation}</Alert>
          </Grid>
          <Grid item xs={6} md={6}>
              <Button type="submit"><SaveIcon /> Save </Button>
          </Grid>
          <Grid item xs={6} md={6}>
              <Button onClick={handleCancel}><CancelIcon />Cancel</Button>
          </Grid>
        </Grid>

        </Box>)
}

export default InputEmptyProfile;
