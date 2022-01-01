import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputWithIcon from "../components/InputWithIcon"
import Header from "../components/Header";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import Box from '@mui/material/Box';
import Container from '@material-ui/core/Container';

function Person(params) {
  let year = new Date(params.detail.birthdate).getFullYear();
  const href='//localhost:3000/id/'+params.detail._id;
  return(<li><a href={href}>{params.detail.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />} {params.detail.fName} {params.detail.lName} ({year})</a></li>)
}

function LandingPage(props) {
  let [data, setData] = React.useState();

  async function go(e) {
    e.preventDefault();
    console.log(e.target.inputName);
    const response = await fetch('//localhost:8000/api/0?name='+e.target.inputName.value);
    const tmp = await response.json();
    setData(tmp);
  }

  return (
    <>
    <Header />
    <Container style={{marginTop:'1em'}}>
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }, }}
                noValidate
                autoComplete="on"
                method="post"
                onSubmit={go}>
      <Stack direction="row" spacing={2}>
        <InputWithIcon />
        <Button variant="outlined" color="primary" type="submit">Enter</Button>
      </Stack>
    </Box>
    <div className="iconView">
    {data && data.map((item, x) => <Person key={x} detail={item} />)}
    </div>
    <iframe src="" style={{border:'none'}} title="Iframe" name="iframe_a"></iframe>
    </Container>
    </>)
}

export default LandingPage;
