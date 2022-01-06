import React from "react";
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

  function handleAddCouple(event) {
    event.preventDefault();
    setAddNew("couple");
  }

  return(<Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <div className="tree"><ul><li><a href="#">{found.fName} {found.lName} <br/>
                                          {found.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />}
                                          {new Date(found.birthdate).getFullYear()}
                                          </a>
            {
              found.couple.map((coupleId, i) =>
              {
                const couple = params.Data.find(x => x._id==coupleId);
                if(couple) {
                  let year = new Date(couple.birthdate).getFullYear();
                  return(<span style={{float:'none'}}>-<a href={coupleId} key={i}>
                        {couple.fName} {couple.lName} <br/>
                        {couple.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />}
                        {year}</a></span>
                        )
                } else {
                  return(<a href={coupleId} key={i}>Partner ID: {coupleId}</a>)
                }
              })
            }
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
            </ul></li><li><a href={found._id} onClick={e => handleAddCouple(e)}>+ Partner</a></li></ul></div>
            </Grid>
            <Grid item xs={12} md={12}>
            <Collapse in={addNew}>
              <InputEmptyProfile Data={found} Relation={addNew}/>
            </Collapse>
            </Grid>
        </Grid>
)
}

export default InputRelation;
