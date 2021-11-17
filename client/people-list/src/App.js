import React, { useState, useEffect } from "react";
import { FormControl, Container, Button, TextField } from "@material-ui/core";
import { Add } from '@material-ui/icons';

function App() {
  const [inputName, setInputName] = useState("");
  const [people, setPeople] = useState([]);
  
  const fetchPeople = async () => {
    const url = `${process.env.REACT_APP_API_URL}/people/get`;

    try {
      const res = await fetch(url);
      const obj = await res.json();
      const results = obj.data;
      setPeople(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const onInputChange = (e) => {
    setInputName(e.target.value);
  };

  const onNameSubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL}/people/create`;
    const conf = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputName }),
    };

    try {
      const res = await fetch(url, conf);
      const obj = await res.json();

      if (obj.status === "success") {
        await fetchPeople();
        setInputName("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <Container maxWidth="sm">
        <form>
          <FormControl fullWidth={true}>
            <TextField
              label="New name"
              variant="standard"
              onChange={onInputChange}
              required={true}
              value={inputName}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
              onClick={onNameSubmit}
            >
              <Add />
              Add
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}

export default App;
