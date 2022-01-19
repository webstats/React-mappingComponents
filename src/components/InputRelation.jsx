/*This jsx corresponding to WIN2*/
import React from "react";
import Grid from '@mui/material/Grid';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import InputEmptyProfile from '../components/InputEmptyProfile';

async function FindByIdNoreset(id) {
    console.warn("Fetching ID: "+id);
         const url = '//familydata.herokuapp.com/api/'+id;
         const response =  await fetch(url);
         const ddd = await response.json();
         return ddd;
}


function handleCancel() {
  const win3 = document.getElementById("win3");
  win3.setAttribute("style", "position:relative; z-index:-1; left:20000px");
}

function InputRelation(params) {
  const found = params.Data[params.Index];
  const [addNew, setAddNew] = React.useState(null);
  const [alertMsg, setAlertMsg] = React.useState(null);
  const [deletePerson, setDeletePerson] = React.useState(null);

  const handleClickOpen = (xPerson, xRelation) => {
    setDeletePerson({...xPerson, xRelation:xRelation});
  };

  const handleClose = () => {
    setDeletePerson(null);
  };

  function handleX(xPerson) {
    const url = '//familydata.herokuapp.com/api/'+found._id+'?name='+xPerson._id+'&del='+xPerson.xRelation;
    console.log(url);
    const response = fetch(url);
    setDeletePerson(null);
    console.log(response);
    setAlertMsg('Done. Please refresh your browser.');
  }

  function Linkin(params) {
    let pData = params.Data;
    const pRelation = params.Relation;

    return(<a href='#'>
            {pData.fName} {pData.lName} <br/>
            {pData.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />}
            {new Date(pData.birthdate).getFullYear()}
            {pRelation && <span onClick={()=>handleClickOpen(pData, pRelation)}><CancelIcon /></span>}
            </a>
          )
  }

  function handleAddChild(event) {
    event.preventDefault();
    if(eval(found.isMale) || found.couple.length>0) {
      setAddNew("child");
    }
    else {
      setAlertMsg('Woman must have a spouse before adding a child.');
    }
  }

  function handleAddCouple(event) {
    event.preventDefault();
    setAddNew("spouse");
    setAlertMsg(null);
  }

  return(<Grid container spacing={2}>
            <CancelIcon className="rightUpperCorner" onClick={handleCancel} />
            <Grid item xs={12} md={12}>
            <h4>{found.fName} {found.lName}'s Family</h4>
            <div className="tree"><ul><li>
                                          <Linkin Data={found} Relation={null} />
            {
              found.couple.map((coupleId, i) =>
              {
                let couple = params.Data.find(x => x._id==coupleId);
                if(!couple) {
                      couple = FindByIdNoreset(coupleId);
                  //return(<a href={coupleId} key={coupleId+i}>Spouse {i+1}</a>)
                }
                return(<span style={{float:'none'}}>
                          -<Linkin Data={couple} Relation="spouse" key={coupleId+i} />
                      </span>
                      )
              })
            }
            <ul>
            { found.children.map((childId, i) =>
              {
                const child = params.Data.find(x=>x._id==childId);
                if(child) {
                  let year = new Date(child.birthdate).getFullYear();
                  return(<li><Linkin Data={child} Relation="child" key={childId+i} /></li>);
                } else {
                  return(<li>No child info fetched from DB: {childId}</li>)
                }
              })
            }
            <li><a href={found._id} onClick={e => handleAddChild(e)}>+ Child</a></li>
            </ul></li><li><a href={found._id} onClick={e => handleAddCouple(e)}>+ Spouse</a></li></ul></div>
            </Grid>
            <Grid item xs={12} md={12}>
            { (alertMsg!=null) && <Alert severity="warning">{alertMsg}</Alert> }
            <Collapse in={deletePerson!=null}>
            { (deletePerson!=null) && <Alert severity="warning">
                You will delete {deletePerson.fName} {deletePerson.lName} from {deletePerson.xRelation}
                </Alert>
            }
            <Button onClick={() => {handleX(deletePerson)}} autoFocus><SaveIcon />Yes</Button>
            <Button onClick={handleClose}><CancelIcon />Cancel</Button>
            </Collapse>
            <Collapse in={addNew!=null}>
              <InputEmptyProfile Data={found} Relation={addNew}/>
            </Collapse>
            </Grid>
        </Grid>
)
}

export default InputRelation;
