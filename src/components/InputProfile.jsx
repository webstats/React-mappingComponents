import React from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function handleCancel() {
  const win2 = document.getElementById("win2");
  win2.setAttribute("style", "position:relative; z-index:-1; left:10000px");
}

function InputProfile(params) {
  const data = params.Data;
  const Bdate = new Date(data.birthdate);
  const Bday = Bdate.toLocaleDateString();
  let url = '//localhost:8000/api/'+data._id;

  const familyChange = (event) => {
     const win3 = document.getElementById("win3");
     win3.setAttribute("style", "position:absolute; z-index:2; left:0px; top:0px");
   };

  return(<Box component="form"
              sx={{'& .MuiTextField-root': { m: 1, width: '30ch' }, flexGrow:1}}
              noValidate
              autoComplete="off"
              action={url}
              method="post"
              >

      <Grid container spacing={2}>
          <Grid item xs={12} md={12}></Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="fName"
              name="fName"
              label="First Name"
              value={data.fName}
              onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
                id="lName"
                name="lName"
                label="Last Name"
                value={data.lName}
                onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
                id="birthdate"
                name="birthdate"
                label="Birthdate"
                value={Bday}
                onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                value={eval(data.isMale)?"true":"false"}
                name="isMale"
              >
                <FormControlLabel value="true" control={<Radio />} label="Male" disabled />
                <FormControlLabel value="false" control={<Radio />} label="Female" disabled />
              </RadioGroup>
            </FormControl>
            </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="countryxxx"
              name="country"
              label="Country of residence"
              value={data.country}
              onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={data.email}
              onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
                id="address"
                name="address"
                label="Address or Township"
                multiline
                maxRows={4}
                value={data.address}
                onChange={(e)=>params.HandleInput(e, params.Index)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{width: '35ch', marginTop:'0.5em'}}>
                <InputLabel id="select-label">Family</InputLabel>
                <Select
                  labelId="select-label"
                  value={0}
                  label="Family members"
                  onChange={familyChange}
                >
                  <MenuItem value={0}>Edit Members ...</MenuItem>
                  <MenuItem value={'children'}>Edit Children</MenuItem>
                  <MenuItem value={'couple'}>Edit Couple</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
              <Button type="submit"><SaveIcon /> Save </Button>
          </Grid>
          <Grid item xs={12} md={6}>
              <Button onClick={handleCancel}>Cancel</Button>
          </Grid>
        </Grid>

        </Box>)
}

export default InputProfile;
