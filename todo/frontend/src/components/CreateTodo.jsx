import  { useState } from 'react'

export function CreateTodo(){

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    return (
        <div>
           <input style={{
            padding:"10px",
            margin:"10px",
           }} 
           onChange={function(e){
            setTitle(e.target.value)
           }}
            type="text" placeholder="title" /> <br />

              <input 
              style={{
            padding:"10px",
            margin:"10px",
           }} 
           onChange={function(e){
            setDescription(e.target.value)
           }}
            type="text" placeholder="description" /> 
              <button 
              style={{
            padding:"10px",
            margin:"10px",
           }} 
           onClick={()=>{
            fetch("http://localhost:3000/todos",{method:"POST",
            body:JSON.stringify({
                title:title,
                description:description
             }),
             headers:{
                "Content-Type":"application/json"
             }
             })
             
           } } >Add a todo</button>


        </div>
    )
}