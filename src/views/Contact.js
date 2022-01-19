/*
* Method: //localhost/contact/0?res=successful
*/
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';

function Contact() {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  let [ httpQuery, setHttpQuery ] = React.useState(searchParams.get('res'));
  let url = '//familydata.herokuapp.com/acc/0';

  return(
    <Box component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '38ch' },
                    maxWidth: "800px",
                    margin: "5em 1em",
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                   }}
                noValidate
                autoComplete="off"
                action={url}
                method="post"
                >
      {httpQuery && <Alert variant="filled" severity="info">{httpQuery} - Thank you!</Alert>}
      <TextField name="name" label="Your Name"/>
      <TextField name="email" label="Your email" type="email" />
      <TextField name="message" label="Message" multiline rows={4} />
      <Button variant="contained" type="submit" ><EmailIcon />  Send your message to us</Button>
    </Box>
  )
}

export default Contact;
