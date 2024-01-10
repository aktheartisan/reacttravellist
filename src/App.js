import { useState } from "react";


function App(){

  const [things,setThings] = useState([]);

  function goneBePacked(cur_item){

    setThings((pre_items)=>([...pre_items,cur_item]));
  }

  //(del) this del has previous data which all items. set that to the filter function and this del.filter
   //is iterate over each object in array and this (delitem) has single object from array 

  function deleteItems(id){

    setThings((del)=>del.filter((delitem)=> delitem.id !== id))
  }

  function updateItems(id){

    setThings((upd)=>upd.map((u)=>u.id === id ? {...u,packed:!u.packed} : u));
  }

  return (<div className="app">
     <Logo />
     <Form  packageItems = {goneBePacked}/>
     <Packinglist cur_thing={things} deleteItems={deleteItems} updateItems={updateItems}/>
     <Stats />
  </div>)
 
 
}

function Logo(){

  return(

    <h1>far way</h1>
  )

}

function Form({packageItems}){

  //these usestate for element controlling (input and dropdown)

  const [items,setItems]=useState("");
  const [num,setNum] = useState(1);

  function listSubmit(e){
    
    e.preventDefault();

    const newItem = {num,items,packed:false,id:Date.now()}

    packageItems(newItem);

  }

  return(

    <form className="add-form" onSubmit={listSubmit}>
      <h3>what you need for trip?</h3>
      <select value={num} onChange={(e)=>setNum(Number(e.target.value))}>
        {Array.from({length:20}, (_,i)=>i+1).map((number)=><option value={number}>{number}</option>)}
      </select>
      <input type="text" placeholder="items..." value={items} onChange={(e)=>setItems(e.target.value)}></input>
      <button>Add</button>
    </form>
    
  )
  
}

function Packinglist({cur_thing,deleteItems,updateItems}){

  console.log(cur_thing);

  return(
    <div className="list">
      <ul>
      {cur_thing.map((items)=><List deleteItems={deleteItems} list={items} updateItems={updateItems} key={items.id}/>)}
      </ul>
    </div>
    
  )
  
}

function List({list,deleteItems,updateItems}){

  return (

    <div>
      <li><input type="checkbox" value={list.packed} onChange={()=>updateItems(list.id)}/><span style={list.packed ? {textDecoration:'line-through'} : {}}>{list.num} {list.items} {list.packed}<button onClick={()=>deleteItems(list.id)}>❌</button></span></li>
    </div>
  )


}

function Stats(){

  return(
    <footer className="stats">
      <em>
        you have already x item in yur list, you have already packed x (x%)
      </em>
    </footer>
  )
  
}


export default App;