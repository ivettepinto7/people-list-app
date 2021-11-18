import React, { useState, useEffect } from "react";
import { FormControl, Container, Button, TextField, Typography, Card, CardContent, Grid } from "@material-ui/core";
import { Add, Edit } from '@material-ui/icons';
import { Delete, Person } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [inputName, setInputName] = useState("");
  const [editName, setEditName] = useState("");
  const [people, setPeople] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchPeople = async () => {
    const url = `${process.env.REACT_APP_API_URL}/people/get`;

    try {
      const res = await fetch(url);
      const obj = await res.json();
      const results = obj.data;
      console.log(results);

      setPeople(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const onInputChange = (e) => {
    setInputName(e.target.value);
  };

  const onEditChange = (e) => {
    setEditName(e.target.value);
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
    } catch (err) {
      console.error(err);
    }
  };

  const onEditNameSubmit = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/people/update/${id}`;
    const conf = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, conf);
      const obj = await res.json();
      console.log(obj);

      if (obj.status === "success") {
        await fetchPeople();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onPersonDelete = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/people/delete/${id}`;
    const conf = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(url, conf);
      const obj = await res.json();
      console.log(obj);

      if (obj.status === "success") {
        await fetchPeople();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form>
          <FormControl fullWidth={true}>
            <Typography variant="h2" component="h4"> People list </Typography>
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
        {people &&
          people.map(({ _id, name }) => (
            <Card
              className="todo-card"
              variant="outlined"
            >
              <CardContent alignItems="center" justify="center" className="card-content" style={{ padding: "16px", color: "white" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  className="todo-text"
                >
                  <Grid container style={{ backgroundColor: "black", padding: 4 }} alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography variant="h5" component="h5">
                        <Person />
                        {name}
                      </Typography>
                    </Grid>
                    <Grid item justify="flex-end">
                      <Button
                        onClick={handleOpen}
                        style={{ margin: 4 }}
                        variant="contained"
                        color="primary"
                      >
                        <Edit />
                        Edit
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit {name}'s name
                          </Typography>
                          <TextField
                            label="New name"
                            variant="standard"
                            onChange={onEditChange}
                            required={true}
                            value={editName}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 5 }}
                            onClick={() => onEditNameSubmit(_id)}
                          >
                            <Edit />
                            Update
                          </Button>
                        </Box>
                      </Modal>

                      <Button
                        style={{ margin: 4 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => onPersonDelete(_id)}
                      >
                        <Delete variant="secondary" />
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </Container>
    </div >
  );
}

export default App;
