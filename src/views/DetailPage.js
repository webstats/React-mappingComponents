/*
* Stable version.
* Bug: always fetch 4 times.
*/
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ManTwoToneIcon from '@mui/icons-material/ManTwoTone';
import InputProfile from '../components/InputProfile';
import InputEmptyProfile from '../components/InputEmptyProfile';
import Header from "../components/Header";

function DetailPage() {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const [data, setData] = React.useState();
  let [ httpQuery, setHttpQuery ] = React.useState(searchParams.get('edit'));
  let neverFetched = true;

  const href = '/tree/'+id;
  let url = '//localhost:8000/api/'+id;

  async function FindById(id) {
        console.warn(id);
        const response =  await fetch(url);
        const ddd = await response.json();
        setData(ddd);
  }

  /*index is here just to keep consistency with other pages, because InputProfile is re-used in TreePage too*/
  function handleChange(event, index) {
    setData(prevData => {return({...prevData, [event.target.name]:event.target.value})})
  }

  function handleClick(event) {
    event.preventDefault();
    if (data && httpQuery!=1) {
      setHttpQuery(1);
    }
  }

  /*
  * Without the if statement, it'll be an infinite loop of fetching
  */ console.log("neverFetched? - "+neverFetched);
  if(data) {
    const Bdate = new Date(data.birthdate)
    const year = Bdate.getFullYear();
    const Bday = Bdate.toLocaleDateString();

    /*
    *   If user clicked on edit person use method: /id/5ca4bbcea2dd94ee58162acf?edit=1
    */
    if(httpQuery == 1) {
      return(<InputProfile Data={data} HandleInput={handleChange} Index={0}/>);
    } else {
      return(<><Header /><dl className="dictionary"><div className="term"><dt>{data.isMale?<ManTwoToneIcon />:<FaceRetouchingNaturalIcon />} {data.fName} {data.lName} ({year})</dt>
      <dd>{data.address}<br/>{data.country}<br/>{data.email}
      </dd><dd className="icons"><a href={href}><AccountTreeTwoToneIcon /></a></dd></div></dl></>)
    }
  } else if (id == 0) {
    return(<><Header /><InputEmptyProfile Data={{_id:0, isMale:true}} Relation='person'/></>)
  } else if (neverFetched) {
    neverFetched = false;
    FindById(id);
    setTimeout(()=>{console.log('Wait a bit for server-side id:'+id); }, 1000)
  }

  return(<p>Loading ...</p>)
}

export default DetailPage;
