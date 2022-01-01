/* This is a stable version.
* Fetch family tree data from port 8000 and rebuild the tree using HTML string by recursion.
* External Dependency: html-react-parser
*/
//import * as Apis from "./Apis";
//import axios from "axios";
import React, {useEffect} from "react";
import emojipedia from "../components/emojipedia";
import Term from "../components/Term";
import parse from "html-react-parser";

//const api =axios.create({baseURL: "//localhost:8000/api"});
const newArray = emojipedia.map(doc => doc.meaning.substring(0,100));

function App() {
    const [treeData, setTreeData] = React.useState();
    const [longStr, setLongStr] = React.useState("");

    function DoTree(List, doneList, i) {
      if (i<0 || i>=List.length) return;
      if(List[i] && doneList.indexOf(i)==-1 ){
        doneList.push(i);
        setLongStr(prevStr => prevStr+'<li><a href="#">'+List[i]._id+'</a>');

        if(List[i].children && List[i].children.length>0) {
          /*this guy has children*/
          setLongStr(prevStr=>prevStr+'<ul>');
          let childrenCount=0;
          List[i].children.forEach(
            childId => {
              childrenCount++;
              let ptr = List.findIndex(doc => doc._id == childId);
              console.log(List[i]._id+"-"+childrenCount+"- child: "+childId+" is at index:"+ptr);
              DoTree(List, doneList, ptr);
            });
          setLongStr(prevStr=>prevStr+'</ul>');
        } else {
          /*has no children*/
          console.log("has no children.");
        }
        setLongStr(prevStr => prevStr+'</li>');
      }
    }

    function DoTree2(List) {
      let i=0;
      let doneList = [];
      //for(i=0;i<List.length;i++)
          DoTree(List, doneList, i);
    }

    async function fetchData(e) {
      setTreeData();
      setLongStr("");
      const response = await fetch('//localhost:8000/api/tree');
      const data = await response.json();
      setTreeData(data.sort((data1, data2)=> {
        if(data1.birthdate > data2.birthdate) {return 1
        }
        if(data1.birthdate < data2.birthdate) {return -1
        }
        return 0
      }));
console.log('treeData is:'+typeof(treeData));
      treeData && DoTree2(treeData);
    }

  return (
    <div>
      <h1>TREE</h1>
      <div className="tree"><ul>{parse(longStr)}</ul></div>
      <div><button onClick={()=>fetchData()}>Go</button></div>
      <dl className="dictionary">
      <div className="term">
      <dt>Alter Collection Schema</dt>
      <dd><a href="//localhost:8000/db/alter?x=foreach">Alter customers to include fatherID, coupleID, children</a></dd>
      </div>
      <div className="term">
      <dt>Start the oldest</dt>
      <dd><a href="//localhost:8000/db/list?x=oldest">Start from the oldest person, find same family name, build relationships.</a></dd>
      </div>
      <div className="term">
      <dt>Insert names to All</dt>
      <dd><a href="//localhost:8000/db/alter?x=insertName">Start fro</a></dd>
      </div>
      <div className="term">
      <dt></dt>
      <dd></dd>
      </div>
      </dl>

      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map( doc =>
              <Term
                  key={doc.id}
                  emoji={doc.emoji}
                  name={doc.name}
                  meaning={doc.meaning}
                />
        )}
      </dl>
      <span>
      {newArray}
      </span>
    </div>
  );
}

export default App;
