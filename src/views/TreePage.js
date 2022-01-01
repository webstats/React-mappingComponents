/*This is an stable version.
* Method: http://localhost:3000/tree/5ca4bbcea2dd94ee58162b91
* will fetch from localhost:8000 and try to rebuild tree using recursion
*/
import React from "react";
import { useParams } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

function Age(params) {
  const Year = new Date(params.Birthdate);
  return (<p>{eval(params.Male)?<ManTwoToneIcon fontSize='tiny'/>:<FaceRetouchingNaturalIcon fontSize='tiny'/>} {Year.getFullYear()}</p>);
}

function Hidden(params) {
    return(<span id={params.Id} className='hidden' onClick={(e)=>handleClick(e, params.Id)}><EditTwoToneIcon sx={{fontSize: 16}}/></span>)
}

function handleMouseOver(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','');
}

function handleMouseOut(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','hidden');
}

function handleClick(event, id) {
    event.stopPropagation();
    window.location.href = '/id/'+id;
}

function TreePage() {
  const { id } = useParams();
  const [ ID, setId ] = React.useState(id);
  const [data, setData] = React.useState();
  let neverFetched = true;

  function change(event, id) {
    event.preventDefault();
    if ( data.findIndex(x=>x._id == id) > -1) {
      console.log('Found ID！啊哈');
      setId(id);
    } else {
      console.log(id+" is not fetched yet. Fetching...")
      window.location.href = id;
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
      const found = data.find(x=>x._id==ID);
      return(<div className="tree" style={{overflowX:'scroll', whiteSpace: 'nowrap'}}>Family Tree
            <ul>{found.fatherID?<li><a href={found.fatherID} onClick={ (e)=>change(e, found.fatherID) }>Go Up</a></li>
                              :<li><a href='#'>Add Ancestor</a></li>}
                <TreeNode Node={found} Key={found.id}/>
            </ul></div>);
  }
  else if(neverFetched) {
    neverFetched = false;
    FindById(ID)
  }

  return (<p>Loading ... </p>)
}

export default TreePage;
