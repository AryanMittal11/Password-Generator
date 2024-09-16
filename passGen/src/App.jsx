import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&**-_+=[]{}~`"

    for (let i = 0; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 bg-gray-400'>
      <h1 className='text-center text-black my-3 text-3xl'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-700 px-3 shrink-0 py-2 text-black'>Copy</button>
        </div>
      </div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 py-8 my-8 text-gray-300 bg-gray-700'>
        
        <div className='flex gap-y-6 flex-col text-xl'>
          <div className='flex gap-y-2 flex-col'>
            <label>Password Length: {length}</label>
            <input type="range" min={6} max={30} value={length} className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}/>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}/>
            <label htmlFor="numberInput">Includes Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}/>
            <label htmlFor="characterInput">Includes Characters</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
