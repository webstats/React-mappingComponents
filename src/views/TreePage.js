/*This is an stable version.
* Method: http://localhost:3000/tree/5ca4bbcea2dd94ee58162b91
* will fetch from localhost:8000 and try to rebuild tree using recursion
*/
import React from "react";
import { useParams } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import Button from "@mui/material/Button";
import InputProfile from '../components/InputProfile';
import InputRelation from '../components/InputRelation';

function Age(params) {
  const Year = new Date(params.Birthdate);
  return (<p>{eval(params.Male)?<ManTwoToneIcon fontSize='tiny'/>:<FaceRetouchingNaturalIcon fontSize='tiny'/>} {Year.getFullYear()}</p>);
}

function handleMouseOver(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','');
}

function handleMouseOut(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','hidden');
}

function TreePage() {
  const { id } = useParams();
  const [ nodeID, setId ] = React.useState(id);
  const [ data, setData ] = React.useState();
  let neverFetched = true;

  function handleInput(event, index) {
    console.log(event.target.name);
    setData(prevData => {
      data[index] = {...data[index], [event.target.name]:event.target.value};
      return [...data];
    });
  }

  function Hidden(params) {
      return(<span id={params.Id} className='hidden' onClick={()=>handleClick(params.Id)}><EditTwoToneIcon sx={{fontSize: 16}}/></span>)
  }

  /*user clicked on edit of individual node on tree*/
  function handleClick(id01) {
      //window.location.href = '/id/'+Id;
      console.log('Changing ID to: '+id01);
      setId(id01);
      const win2 = document.getElementById("win2");
      setTimeout(()=>win2.setAttribute("style", "position:absolute; z-index:1; left:0px"), 1000);
  }

  /*user clicked on Go Up or individual node*/
  function change(event, id01) {
    event.preventDefault();
    if ( data.findIndex(x=>x._id == id01) > -1) {
      console.log('Found ID！啊哈');
      setId(id01);
    } else {
      console.log(id01+" is not fetched yet. Fetching...")
      window.location.href = id01;
    }
  }

  async function FindById(id) {
        console.warn("Fetching ID: "+id);
        const url = '//localhost:8000/tree/'+id;
        const response =  await fetch(url);
        const ddd = await response.json();
        setData(ddd);
  }

  function TreeNode(params) {
    const { _id, fName, lName, isMale, birthdate, children } = params.Node;

    if(children.length > 0) {
      /*it's a branch*/
      return(
        <li><a href={_id}
              onClick={ (e)=>change(e, _id) }
              onMouseOver={()=>handleMouseOver(_id)}
              onMouseOut={()=>handleMouseOut(_id)}>
                {fName} {lName}
                <Age Male={isMale} Birthdate={birthdate} />
                <Hidden Id={_id} />
            </a><ul>
        { children.map((childId) =>
          {
            const found = data.find(x=>x._id==childId);
            return(<TreeNode Node={found} key={childId}/>);
          })
        }
        </ul></li>)

      } else {
        /*it's a leaf*/
        return(<li><a href="#" onMouseOver={()=>handleMouseOver(_id)} onMouseOut={()=>handleMouseOut(_id)}>{fName} {lName}<Age Male={isMale} Birthdate={birthdate} /> <Hidden Id={_id} /></a></li>)
      }
    }

  if (data) {
      const foundIndex = data.findIndex(x=>x._id==nodeID);
      if(foundIndex < 0) {
        return(<h1>Node ID not found.</h1>);
      } else {
      return(<div style={{overflowX:'scroll', whiteSpace: 'nowrap'}}>
              <div className="tree">Family Tree
              <ul>{data[foundIndex].fatherID?<li><a href={data[foundIndex].fatherID} onClick={ (e)=>change(e, data[foundIndex].fatherID) }>Go Up</a></li>
                                :<li><a href='#'>Add Ancestor</a></li>}
                  <TreeNode Node={data[foundIndex]} Key={data[foundIndex].id}/>
              </ul>
              </div>
              <div id="win2"><div className="popupBody">
                <InputProfile Data={data[foundIndex]} HandleInput={handleInput} Index={foundIndex} />
              </div></div>
              <div id="win3"><div className="popupBody">
                <InputRelation Data={data} Index={foundIndex}/>
              </div></div>
            </div>);
      }
  }
  else if(neverFetched) {
    neverFetched = false;
    FindById(nodeID)
  }

  return (<p>Loading ... </p>)
}

export default TreePage;
