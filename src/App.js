
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'



const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const random_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
const ingredients_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

function App() {

  const [drink, setDrink] = useState(0)
  const [drinkName, setDrinkName] = useState(0)
  const [search, setSearch] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [drinklist, setDrinklist] = useState([])
  function searchFunction() {

    let searchAddress = API_URL + search
    let drinkslist = [];
    axios.get(searchAddress)
      .then((response) => {
        console.log(response.data)
        for (let i = 0; response.data.drinks[i] != null; i++) {
          drinkslist[i] = response.data.drinks[i].strDrink

          console.log(drinkslist)
        }

        setDrinklist(drinkslist)

      }).catch(error => {
        alert(error)
      })


  }
  function getIngredients() {
    let ingredientsAddress = ingredients_URL + drink
    axios.get(ingredientsAddress)
      .then((response) => {
        console.log(ingredientsAddress)
        setIngredients(response.data.drinks[0].strInstructions)





      }).catch(error => {
        alert(error)
      })

  }

  useEffect(() => {


    axios.get(random_URL)
      .then((response) => {
        console.log(response.data)
        setDrink(response.data.drinks[0].idDrink)
        setDrinkName(response.data.drinks[0].strDrink)



      }).catch(error => {
        alert(error)
      })


  }, [])



  return (
    <div className="App">
      <p>Our pick for you</p>

      <h3>{drinkName}</h3>
      <p>{ingredients}</p>
      <button type="button" onClick={getIngredients}>More</button>

      <h3>Search for drink</h3>
      <form>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} ></input>
        <button type="button" onClick={searchFunction}>Search</button>
        <p>search results:</p>
        <p>{drinklist[0]}</p>
        <p>{drinklist[1]}</p>
        <p>{drinklist[2]}</p>
        <p>{drinklist[3]}</p>
        <p>{drinklist[4]}</p>

      </form>


    </div>

  );
}

export default App;
