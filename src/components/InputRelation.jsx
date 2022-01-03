import React from "react";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import Collapse from '@mui/material/Collapse';
import InputEmptyProfile from '../components/InputEmptyProfile';

function handleCancel() {
  const win3 = document.getElementById("win3");
  win3.setAttribute("style", "position:relative; z-index:-2; left:10000px");
}

function InputRelation(params) {
  const found = params.Data[params.Index];
  const [addNew, setAddNew] = React.useState(null);

  function handleAddChild(event) {
    event.preventDefault();
    setAddNew("child");
  }

  function handleChange(event) {

  }

  return(<Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <div className="tree"><ul><li><a href="#">{found.fName} {found.lName}</a>
            <ul>
            { found.children.map((childId, i) =>
              {
                const child = params.Data.find(x=>x._id==childId);
                if(child) {
                  let year = new Date(child.birthdate).getFullYear();
                  return(<li key={childId}>
                        <a href='#'>
                        {child.fName} {child.lName} <br/>
                        {child.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />}
                        {year}</a></li>
                        )
                } else {
                  return(<h5>No child info fetched from DB: {childId}</h5>)
                }
              })
            }
            <li><a href={found._id} onClick={e => handleAddChild(e)}>+ Child</a></li>
            </ul></li><li><a href="#">+ wife</a></li></ul></div>
            </Grid>
            <Grid item xs={12} md={12}>
            <Collapse in={addNew}>
              <InputEmptyProfile Data={found} Relation={addNew} HandleInput={handleChange} Index={0}/>
            </Collapse>
            </Grid>
        </Grid>
)
}

export default InputRelation;
