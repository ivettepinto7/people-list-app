import React, { useState, useEffect } from "react";
import { FormControl, Container, Button, TextField, Typography, Card, CardContent, Grid } from "@material-ui/core";
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
      console.log(results);
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
      console.log(obj);
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
      <Container>
        <Card>
          <CardContent className="card-content" style={{ padding: "16px" }}>
            <Typography
              variant="h5"
              component="h2"
            >
              <Grid conatiner alignItems="center" justify="flex-start">
                <Grid item style={{ flex: 2 }}>
                  <Typography variant="h4">Hola</Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container>
        {people.map(({ _id, name }) => (
          <Card>
            <CardContent className="card-content" style={{ padding: "16px" }}>
              <Typography
                variant="h5"
                component="h2"
              >
                <Grid conatiner alignItems="center" justify="flex-start">
                  <Grid item style={{ flex: 2 }}>
                    <Typography variant="h4">{name}</Typography>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        ))
        </Container>
      }
    </div >
  );
}

export default App;
