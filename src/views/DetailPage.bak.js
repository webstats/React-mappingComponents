/*
* Stable version. lalalla
* Bug: always fetch 4 times.
*/
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function DetailPage() {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const [data, setData] = React.useState();
  let [ httpQuery, setHttpQuery ] = React.useState(searchParams.get('edit'));
  let neverFetched = true;

  const href = '/tree/'+id;
  let url = '//localhost:8000/api/'+id;

  async function FindById(id) {
        console.warn(id);
        const response =  await fetch(url);
        const ddd = await response.json();
        setData(ddd);
  }

  function handleSubmit(event) {
    //event.preventDefault();
    const { fName, lName } = event.target;
    console.log(fName.value+lName.value);
  }

  function handleChange(event) {
    setData({...data, [event.target.name]:event.target.value})
  }

  function handleClick(event) {
    event.preventDefault();
    if (data && httpQuery!=1) {
      setHttpQuery(1);
    }
  }

  /*
  * Without the if statement, it'll be an infinite loop of fetching
  */
  if(data) {
    const Bdate = new Date(data.birthdate)
    const year = Bdate.getFullYear();
    const Bday = Bdate.toLocaleDateString();

    /*
    *   If user clicked on edit person use method: /id/5ca4bbcea2dd94ee58162acf?edit=1
    */
    if(httpQuery == 1) {
      return(<Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '35ch' },}}
                  noValidate
                  autoComplete="off"
                  action={url}
                  method="post"
                  onSubmit={handleSubmit}>
          <div><TextField
            id="fName"
            name="fName"
            label="First Name"
            multiline
            maxRows={4}
            value={data.fName}
            variant="filled" onChange={handleChange}/>
          <TextField
              id="lName"
              name="lName"
              label="Last Name"
              multiline
              maxRows={4}
              value={data.lName}
              variant="filled" onChange={handleChange} />
            </div>
            <div>
            <TextField
                id="birthdate"
                name="birthdate"
                label="Birthdate"
                multiline
                maxRows={4}
                defaultValue={Bday}
                variant="filled" />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                defaultValue={data.isMale?"true":"false"}
                name="isMale"
              >
                <FormControlLabel value="true" control={<Radio />} label="Male" />
                <FormControlLabel value="false" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            </div>
            <div><TextField
              id="country"
              name="country"
              label="Country of residence"
              multiline
              maxRows={4}
              value={data.country}
              variant="filled" onChange={handleChange}/>
              <TextField
                id="email"
                name="email"
                label="Email"
                multiline
                maxRows={4}
                value={data.email}
                variant="filled" onChange={handleChange}/>

              </div>
              <div>
              <TextField
                  id="address"
                  name="address"
                  label="Address or Township"
                  multiline
                  maxRows={4}
                  value={data.address}
                  variant="filled" onChange={handleChange} />
                <button><SaveIcon /></button>
                </div>
            </Box>

        );
    } else {
      return(<dl className="dictionary"><div className="term"><dt>{data.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />} {data.fName} {data.lName} ({year})</dt>
      <dd>{data.address}<br/>{data.country}<br/>{data.email}
      </dd><dd className="icons"><a href="?edit=1" onClick={handleClick}><EditTwoToneIcon /></a>  <a href={href}><AccountTreeTwoToneIcon /></a></dd></div></dl>)
    }
  } else if (neverFetched) {
    neverFetched = false;
    FindById(id);
    setTimeout(()=>{console.log('Wait a bit for server-side...'); }, 3000)
  }

  return(<p>Loading ...</p>)
}

export default DetailPage;
