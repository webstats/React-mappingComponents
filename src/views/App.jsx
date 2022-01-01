import React from "react";

function App() {
  const [treeData, setTreeData] = React.useState("");

  async function fetchData() {
      const response = await fetch('//localhost:8000/api/all');
      const data = await response.json();
      /*HTTP response contains a data object which is an Array*/
      console.log(data);
      setTreeData(data.toString());
  }

function postData() {
      const JSONString = {lName:'wei',fName:'chen'};
      fetch('http://localhost:8000/api/1234', {
         mode: 'no-cors',
         method: 'POST',
         headers:{
            'Content-Type':'application/json',
            //'Content-Type':'text/plain',
           //'Access-Control-Allow-Origin':'*'
          },
          body: JSON.stringify(JSONString)
      })
      .then(response => console.log(response))
      .then(data => data && console.log(data));
  }

  async function deleteData() {
    const obj = {lName:'wei',fName:'chen'};
    await fetch('http://localhost:8000/api/1234', {
       method: 'DELETE',
       headers: {
         'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(obj)
    })
    .then(response => console.log(response))
    .then(data => data && console.log(data));
  }

  function go(e) {
    e.preventDefault();
    console.log(e.target);
  }
  return (
    <div>
      <h1>DB operations</h1>
      <form id='submitForm' name='submitForm' action='http://localhost:8000/api/1234' method='POST' onSubmit={go}>
        <input type='text' name='text'></input>
        <button type='submit'>submit!</button>
      </form>
      <button onClick={fetchData}>Test Get All</button>
      <button onClick={postData}>Test Post</button>
      <button onClick={deleteData}>Test Delete</button>
      <p>{treeData}</p>
    </div>
  );
}

export default App;
