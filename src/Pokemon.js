import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import * as Mui from '@material-ui/core';
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: "20px",
      maxWidth: 700,
      margin: "auto",
    },
    container: {
      paddingTop: "20px",
    },
    media: {
      margin: "auto",
    },
    avatar: {
      backgroundColor: red[500],
    },
    backButton: {
      alignItems: "right",
    },
    table: {
        minWidth: 650,
    },
}));

const Pokemon = (props) => {
  const classes = useStyles();
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined)

  useEffect(() => {
    axios 
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then(function (response) {
      const { data } = response;
      setPokemon(data);
    })
    .catch(function (error) {
      setPokemon(false);
    });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    function createData(name, calories) {
        return { name, calories};
    }
      
      const rows = [
        createData('Species', `${species.name}` ),
        createData('Height', `${height}`),
        createData('Weight', `${weight}`),
      ];

    return (
      <>
       <div className = { classes.container }>
        <Mui.Card className={classes.root}>
        <Mui.CardHeader
            avatar={
            <Mui.Avatar aria-label="recipe" className={classes.avatar}>
                { name.charAt(0) }
            </Mui.Avatar>
            }
            title={
            <Mui.Typography component="h5" variant="h5">
              {toFirstCharUppercase(name)}
            </Mui.Typography>
            }
        />
        <Mui.CardMedia
            className={classes.media}
            image={ fullImageUrl} 
            style= {{ width: "350px", height: "350px" }}
        />
        <Mui.CardContent />
        <Mui.TableContainer component={Paper}>
            <Mui.Table className={classes.table} aria-label="simple table">
                <Mui.TableBody>
                    {rows.map((row) => (
                        <Mui.TableRow key={row.name}>
                        <Mui.TableCell component="th" scope="row">
                            {row.name}
                        </Mui.TableCell>
                        <Mui.TableCell align="left">{row.calories}</Mui.TableCell>
                        </Mui.TableRow>
                    ))}
                </Mui.TableBody>
            </Mui.Table>
        </Mui.TableContainer>
        </Mui.Card>
       </div>
      </>
    );
  }
  return ( <> 
    {pokemon === undefined && <Mui.CircularProgress />}
    {pokemon !== undefined && pokemon && generatePokemonJSX()}
    {pokemon === false && <Mui.Typography> Pokemon not found</Mui.Typography>}
    {pokemon !== undefined && (
      <Mui.Grid container justify="flex-end">
        <Mui.Button variant = "contained" 
        onClick={() => history.push("/")}>
        back to pokedex
        </Mui.Button>
      </Mui.Grid>
    )}
  </>);

};

export default Pokemon