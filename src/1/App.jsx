/* This is a stable version.
* Fetch family tree data from port 8000 and rebuild the tree using React DOM elements by recursion.
*/
//import * as Apis from "./Apis";
//import axios from "axios";
import React, {useEffect} from "react";
import emojipedia from "../components/emojipedia";
import Term from "../components/Term";

//const api =axios.create({baseURL: "//localhost:8000/api"});
const newArray = emojipedia.map(doc => doc.meaning.substring(0,100));

function App() {
    const [treeData, setTreeData] = React.useState();

    function TreeBranch(props) {
            let ptr = props.arry.findIndex(doc => doc._id == props.childId);
            return(<TreeNode key={props.childId} id={props.childId} ptr={ptr} arry={props.arry} />);
    }

    function TreeNode(props) {
        const arry =props.arry;
        let ptr =props.ptr;
        let id =props.id;

        if (arry[ptr]) {
          if(arry[ptr].children && arry[ptr].children.length>0) {
            /*this guy has children*/
            return(<li><a href="#">{props.id}</a><ul>
              {arry[ptr].children.map(
                childId => <TreeBranch childId={childId} arry={arry} />
              )}
              </ul></li>);
          } else {
            /*this guy has no child*/
          }
          return(<li><a href="#">{props.id}</a></li>);
      }
      return("");
    }

    async function fetchData(e) {

      if(treeData) {
      } else {
        const response = await fetch('//localhost:8000/api/tree');
        const data = await response.json();
        setTreeData(data.sort((data1, data2)=> {
          if(data1.birthdate > data2.birthdate) {return 1
          }
          if(data1.birthdate < data2.birthdate) {return -1
          }
          return 0
        }));
      }
console.log('treeData is:'+typeof(treeData));
    }

  return (
    <div>
      <h1>TREE</h1>
      <div className="tree">
        <ul>
        {treeData && treeData.map( (doc, index, arry) =>
          <TreeNode
            key={doc._id}
            id={doc._id}
            ptr={index}
            arry={arry}
          />
        )}
        </ul></div>
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
