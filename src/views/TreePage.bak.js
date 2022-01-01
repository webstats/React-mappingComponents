/*This is a stable version.
* Method: http://localhost:3000/tree/5ca4bbcea2dd94ee58162b91
* will fetch from localhost:8000 and list out response unsorted.
*/
import React from "react";
import { useParams } from "react-router-dom";

function TreePage() {
  const { id } = useParams();
  const [data, setData] = React.useState();


  async function FindById(id) {
        console.warn(id);
        const url = '//localhost:8000/tree/'+id;
        const response =  await fetch(url);
        const ddd = await response.json();
        setData(ddd);
  }


  function Detail(params) {
    /*
      Without the if statement, it'll be an infinite loop of fetching
    */
    if(!data) {
      FindById(params.Id)
    }

    return(<span>Family Tree
      {data && data.map((person, index)=>{
        const year = new Date(person.birthdate).getFullYear();
        return(<p>{person.fName} {person.lName} ({year})</p>)})
      }
    </span>)
  }

  return (<Detail Id={id} />)
}

export default TreePage;
