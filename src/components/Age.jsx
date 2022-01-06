import React from "react";
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

function Age(params) {
  const Year = new Date(params.Birthdate);
  return (<p>{eval(params.Male)?<ManTwoToneIcon fontSize='tiny'/>:<FaceRetouchingNaturalIcon fontSize='tiny'/>} {Year.getFullYear()}</p>);
}

export default Age;
