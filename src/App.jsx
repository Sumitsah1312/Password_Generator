import { useCallback, useEffect, useState,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [isnumber,setisNumber]=useState(false)
  const [ischar,setisChar]=useState(false)
  const [password,setPassword]=useState("")

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isnumber) str+="0123456789"
    if(ischar) str+="!@#$%^&*-_+={}[]~`"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char)
    }

    setPassword(pass);


  },[length,ischar,isnumber,setPassword])
  const copytoClipboard=useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])
  const passref=useRef(null)

  useEffect(()=>{passwordGenerator()},[length,ischar,isnumber,setPassword])
  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 m-8 text-orange-500 bg-gray-600'>
        <div className='text-white text-3xl p-3 text-center'>Password Generator</div>
              <div className='flex shadow rounded-lg overflow-hidden m-3 '> 
                <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password ' ref={passref} readOnly />

                <button className='text-white outline-none bg-blue-700 text-lg p-3'onClick={()=>{copytoClipboard()}}>Copy</button>
              </div>

              <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                  <input type="range" min={6} max={20} value={length} className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                  />
                  <label >Length :{length}</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input type="checkbox" defaultChecked={isnumber} id='numberInput'
                  onChange={()=>{setisNumber((prev)=>!prev)}}
                  />
                  <label >Numbers</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input type="checkbox" defaultChecked={isnumber} id='numberInput'
                  onChange={()=>{setisChar((prev)=>!prev)}}
                  />
                  <label >Characters</label>
                </div>
              </div>

       </div>

    </>
  )
}

export default App
