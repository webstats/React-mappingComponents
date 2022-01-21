import React from "react";
import Stack from '@mui/material/Stack';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import InputWithIcon from "../components/InputWithIcon";
import ButtonBases from "../components/ButtonBases";

const images = [
  {
    url: "/images/buttons/tree1.JPG",
    href: "/tree/5ca4bbcea2dd94ee58162c36",
    title: "View a Sample Tree",
    width: "60%"
  },
  {
    url: "/images/buttons/tree2.JPG",
    href: "/id/0",
    title: "Build a Tree",
    width: "40%"
  }
];

function Person(params) {
  let year = new Date(params.detail.birthdate).getFullYear();
  const href='/id/'+params.detail._id;
  return(<li><a href={href}>{params.detail.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />} {params.detail.lName} {params.detail.fName} ({year})</a></li>)
}

function LandingPage(props) {
  let [data, setData] = React.useState();
  let [loading, setLoading] = React.useState(false);

  async function go(e) {
    e.preventDefault();
    let inputName = e.target.inputName.value;
    setLoading(true);
    inputName = inputName.toUpperCase();
    const response = await fetch('//familydata.herokuapp.com/api/0?name='+inputName);
    const tmp = await response.json();

    if(Object.keys(tmp).length <= 0) {
      setData(null);
      setLoading(false);
    } else {
      setData(tmp);
      setLoading(false);
    }
  }

  return (
    <Box sx={{display: "block",
              margin:"1em",
              padding:"2em",
              width: "90%",
              alignItems:"center"
            }}>
    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}
                noValidate
                autoComplete="on"
                method="post"
                onSubmit={go}>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <InputWithIcon />
        <Button type="submit" variant="outlined">{ loading?<img src='/images/buttons/preloader.gif' alt='loading' />:<SendIcon fontSize="small"/>} Search</Button>
      </Stack>
    </Box>
    <div className="iconView">
    {data && data.map((item, x) => <Person key={x} detail={item} />)}
    </div>
    <Collapse in={data===null}>
    <h5>Seems nobody from this family has created any tree here. You are free to create a family tree for this name. So go ahead, give it a try, build a new Tree. Or view and play around a sample tree.</h5>
    <ButtonBases Images={images} />
    </Collapse>
    <iframe src="" style={{border:'none'}} title="Iframe" name="iframe_a"></iframe>
    </Box>
    )
}

export default LandingPage;
