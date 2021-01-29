import React, { useState, useEffect } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { getFilms, getCharacters } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  loader: {
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '30%'
  },
  root: {
    width: '100%',
    padding: '1rem'
  },
  root1: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: 10
  },
  gridList: {
    width: '98%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  root2: {
    minWidth: 275,
    padding: 10,
    width: '96.5%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const classes = useStyles();
  const [films, setFilms] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const characterData = useSelector(state => state?.films?.data);
  const filmsData = useSelector(state => state?.films?.filmsData);
  const error = useSelector(state => state?.films?.error);
  const filmsError = useSelector(state => state?.films?.filmsError);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  useEffect(() => {
    setLoader(false);
    setCharacters(characterData)
  }, [characterData]);

  useEffect(() => {
    setLoader(false);
    setFilms(filmsData)
  }, [filmsData]);

  useEffect(() => {
    if (error) {
      setLoader(false);
      setOpen(true);
      setMessage(error?.message)
    }
  }, [error]);

  useEffect(() => {
    if (filmsError) {
      setLoader(false);
      setOpen(true);
      setMessage(filmsError?.message)
    }
  }, [filmsError]);

  function TitlebarGridList() {
    return (
      <div className={classes.root1}>
        <GridList cellHeight={70} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Films</ListSubheader>
          </GridListTile>
          {films.map((film) => (
            <GridListTile key={film.title}>
              <GridListTileBar
                title={film.title}
                subtitle={<span>by: {film.director}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${film.title}`} className={classes.icon}>
                    <MovieCreationIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
  function CardLayout() {
    const length = films.length;
    return (<div className={classes.root2}>
      {!!length && <Card >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Moview Name
    </Typography>
          <Typography variant="body2" component="p">
            {films[length - 1].title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Release Date
    </Typography>
          <Typography variant="body2" component="p">
            {films[length - 1].release_date}
          </Typography>
        </CardContent>
      </Card>
      }</div>)
  }
  function handleClose() {
    setMessage('');
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      {loader && <CircularProgress className={classes.loader} />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Alert onClose={handleClose} severity="error">
          {message || 'Some problem occured'}
        </Alert>
      </Snackbar>
      <section>
        <div className="row">
          <FormControl className={classes.margin}>
            <Autocomplete
              id="combo-box-demo"
              options={characters}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              onChange={(evt, value) => {
                setLoader(true);
                dispatch(getFilms(value));
              }}
              renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
            />
          </FormControl>
        </div>
        <TitlebarGridList></TitlebarGridList>
        <CardLayout></CardLayout>
      </section>
    </div>
  );
}

export default App;
