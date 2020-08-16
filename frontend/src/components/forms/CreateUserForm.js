import React, {useState} from 'react';

const CreateUserForm = ({ create, notify }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleCreateNewUser = async (e) => {
    e.preventDefault()

    try {
      const res = await create({
        username,
        password
      })
      if(res) {
        notify(`new profile for ${username} created successfully!`)
        setUsername("")
        setPassword("")
      }
    }catch(e){
      notify("Failed to create a new user!", true)
    }
  }

  return (
    <div>
      <h3>New to CoffeeNote? Create a profile!</h3>
      <form onSubmit={handleCreateNewUser}>
        <div> 
          username
          <input
            type="text"
            onChange={({ target }) => { setUsername(target.value) }}
            value={username}
          />
        </div>
        <div>
          password
          <input
            type="password"
            onChange={({ target }) => { setPassword(target.value) }}
            value={password}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateUserForm;