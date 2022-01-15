/*This is an stable version.
* Method: http://localhost:3000/tree/5ca4bbcea2dd94ee58162b91
* Fetch from localhost:8000/tree and rebuild tree using recursion.
* Know issue: Cammie Sipos, woman with multiple husbands shows up OK if searched her name,
*             but coming down from her ancestor tree only shows her husband at the end of couple Array.
*/
import React from "react";
import { useParams } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import InputProfile from '../components/InputProfile';
import InputRelation from '../components/InputRelation';
import InputEmptyProfile from '../components/InputEmptyProfile';
import Age from '../components/Age';
import Header from "../components/Header";

function handleMouseOver(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','hiddenNon');
}

function handleMouseOut(id) {
  const element = document.getElementById(id);
  element.setAttribute('class','hidden');
}

function handleAddParent(event) {
  event.preventDefault();
  const win1 = document.getElementById("win1");
  win1.setAttribute("style", "position:absolute; z-index:2; left:0px")
}

function TreePage() {
  const { id } = useParams();
  const [ nodeID, setId ] = React.useState(id);
  const [ DATA, setData ] = React.useState();
  let neverFetched = true;

  function handleInput(event, index) {
    console.log(event.target.name);
    setData(prevData => {
      DATA[index] = {...DATA[index], [event.target.name]:event.target.value};
      return [...DATA];
    });
  }

  function Hidden(params) {
      return(<span id={params.Ukey} className='hidden' onClick={()=>handleEdit(params.Id)}><EditTwoToneIcon sx={{fontSize: 16}}/></span>)
  }

  function HiddenMama(params) {
    return(<span id={params.Id} className='hiddenNon'><AccountTreeTwoToneIcon sx={{fontSize: 16}} alt="Happily Married!" /></span>)
  }

  /*user clicked on edit of individual node on tree*/
  function handleEdit(id01) {
      //window.location.href = '/id/'+Id;
      console.log('Changing ID to: '+id01);
      //setId(id01);
      const win2 = document.getElementById("win2");
      setTimeout(()=>win2.setAttribute("style", "position:absolute; z-index:1; left:0px"), 1500);
  }

  /*user clicked on Go Up or individual node*/
  function change(event, id01) {
    event.preventDefault();
    if ( DATA.findIndex(x=>x._id == id01) > -1) {
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

  function Linkn(params) {
    const personId = params.Uid;
    const key = params.Ukey;

    const person = DATA.find(x => x._id==personId);

    return(<a href={personId}
                onClick={ (e)=>change(e, person._id) }
                onMouseOver={()=>handleMouseOver(key)} onMouseOut={()=>handleMouseOut(key)}>
                {person.fName} {person.lName}
                <Age Male={person.isMale} Birthdate={person.birthdate} />
                <Hidden Id={person._id} Ukey={key} />
           </a>)
  }

  function FemaleNode(params) {
    const wifeData = params.Node;
    if(wifeData.couple.length>0){
      return(wifeData.couple.map((husbandId, index)=>{
                const husbandData = DATA.find(x => x._id==husbandId);
                if (husbandData) {
                  return(<TreeNode Node={husbandData} key={index+husbandId}/>)
                } else {
                  return(<li key={index+husbandId}><a href={husbandId}>view spouse {index+1}</a></li>)
                  //FindById(husbandId);
                }
            }))
      } else {
        return(<TreeNode Node={wifeData} key={'000'+wifeData._id}/>)
      }
  }

  function Branch(params) {

    const children = params.Person.children;
    if (children.length > 0){
      return(<ul>
        { children.map((childId, index) =>
          {
            const found = DATA.find(x=>x._id==childId);
            if(found) {
              return(<TreeNode Node={found} key={index+childId}/>);
            }
            //else {              FindById(params.Person._id);            }
            else {
              window.location.href = params.Person._id;
              //return(<ul key={index+childId}><li><a href={childId}>view child {index+1}</a></li></ul>)
            }
          })
        }
        </ul>)
    } else { return ''; }
  }

  function TreeNode(params) {
    const { _id, fName, lName, isMale, birthdate, children, couple } = params.Node;

    if(children.length > 0) {
      /*it's a branch. Only Males. Females have 0 Children.*/
      return(
        <li>{ couple.map((coupleId) =>
              {
                  return(<span key={coupleId}><Linkn Uid={coupleId} Ukey={_id+coupleId} key={coupleId} />-</span>);
               })
             }
             <Linkn Uid={_id} Ukey={_id} key={_id} />
             <Branch Person={params.Node} />
          </li>)

      } else { /*it's a leaf: if it's female and has partner(s), need fetching her partner family first.*/

        return(<li><Linkn Uid={_id} Ukey={_id} key={_id} /></li>)
      }
    }


  if (DATA) {
      const foundIndex = DATA.findIndex(x=>x._id==nodeID);
      if(foundIndex < 0) {
        return(<h1>ID not found:{nodeID}</h1>);
      } else {
      return(<div>
              <Header />
              <div className="tree">Family Tree of {DATA[foundIndex].fName} {DATA[foundIndex].lName}
              <ul>{DATA[foundIndex].fatherID?
                        <li><a href={DATA[foundIndex].fatherID} onClick={ (e)=>change(e, DATA[foundIndex].fatherID) }>Go Up</a></li>
                        :<li><a href='#' onClick={handleAddParent}>Add Parent</a></li>
                  }
                  { DATA[foundIndex].isMale?
                    <TreeNode Node={DATA[foundIndex]} key={foundIndex+DATA[foundIndex]._id}/>
                    : <FemaleNode Node={DATA[foundIndex]} key={foundIndex+DATA[foundIndex]._id} />
                  }
              </ul>
              </div>
              <div id="win1"><div className="popupBody">
                <InputEmptyProfile Data={DATA[foundIndex]} Relation="father" />
              </div></div>
              <div id="win2"><div className="popupBody">
                <InputProfile Data={DATA[foundIndex]} HandleInput={handleInput} Index={foundIndex} />
              </div></div>
              <div id="win3"><div className="popupBody">
                <InputRelation Data={DATA} Index={foundIndex}/>
              </div></div>
            </div>);
      }
  }
  else if(neverFetched) {
    /*neverFetched should have been a hook, should have been erased*/
    neverFetched = false;
    FindById(nodeID)
  }

  return (<p>Loading ... </p>)
}

export default TreePage;
