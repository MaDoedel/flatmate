import * as React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

function MyHeader() {
  return (
    <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous"></link>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
          <title>Flatmates</title>
    </head>
  );
}

function MyBody() {
  const [users, setUsers] = React.useState([]);

  return (
    <body>
      <div class="container text-center pt-4">
        <div class="row mx-2 my-2">
          <div class="col">
            <p></p>
          </div>
          <div class="col-8">
            <MyControlPanel users={users} setUsers={setUsers}/>
          </div>
          <div class="col">
            <p></p>
          </div>
        </div>
      </div>
    </body>
  );
}


function MyUsers({ users, setUsers, areaDiff, setAreaDiff}) {
  const [name, setName] = React.useState("");

  function handleNameChange(event) {
    let value = event.currentTarget.value;
    setName(value); 
  }

  function handleUserDelete(event) {
    let key = parseInt(event.currentTarget.getAttribute("data-id", 10));
    var some_user = users.find(user => user.key === key);

    if (some_user) {
      var size = some_user.size;
      var diff = size / (users.length - 1);

      var updatedUsers = users.filter(user => user.key !== key);
      updatedUsers = updatedUsers.map(user => {
        user.size += diff;
        return user;
      });
      setUsers(updatedUsers);
    }
  }

  function handleName(event) {
    let newKey = 1;
    while (users.find(user => user.key === newKey)) {
      newKey++;
    }

    let maxSizeUser = users.reduce((prev, current) => (prev.size > current.size) ? prev : current, { size: 0 });

    const halfSize = maxSizeUser.size / 2;

    const updatedUsers = users.map(user => {
      if (user.key === maxSizeUser.key) {
        return { ...user, size: halfSize };
      }
      return user;
    });

    updatedUsers.push({ key: newKey, name: name, size: halfSize });

    setUsers(updatedUsers);
    setName("");
  }

  function handleChangeName(event) {
    let key = parseInt(event.currentTarget.getAttribute("data-id", 10));
    let value = event.currentTarget.value;

    var updatedUsers = users.map(user => {
      if (user.key === key) {
        user.name = value;
      }
      return user;
    });

    setUsers(updatedUsers);
  }

  function handleChangeSize(event) {
    let key = parseInt(event.currentTarget.getAttribute("data-id", 10));
    let value = parseFloat(event.currentTarget.value);

    if (isNaN(value) || value < 0) {
      value = 0;
    }

    var somediff = 0;
    var updatedUsers = users.map(user => {
      if (user.key === key) {
        somediff = areaDiff + (user.size - value);
        setAreaDiff(somediff);
        user.size = value;
      }
      return user;
    });

    setUsers(updatedUsers);
  }


  return (
    <div class="row my-2  rounded border border-secondary">
      <div class="col-12 ">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">area</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                
                <tr>
                  <th scope="row">{user.key}</th>
                  <td><input class="form-control" type="text" data-id={user.key} value={user.name} onChange={handleChangeName}/></td>
                  <td><input class="form-control" type="number" step="0.01" data-id={user.key} value={user.size} onChange={handleChangeSize}/></td>
                  <td>
                  {user.key !== 0 && (
                    <button class="btn btn-outline-danger" data-id={user.key} onClick={handleUserDelete}><span class="bi bi-dash-lg"></span></button>
                  )}</td>
                </tr>
              ))
            }
            {areaDiff !== 0 && (
              <tr>
                <th scope="row"></th>
                <td><p class="form-control" id="diff" name="name">diff</p></td>
                <td><p class="form-control" name="diff">{areaDiff}</p></td>   
                <td></td>
              </tr>
            )} 
            {users.length !== 0 && (
              <tr>
                <th scope="row"></th>
                <td><input class="form-control" type="text" id="name" name="name" value={name} onChange={handleNameChange}/></td>
                <td></td>
                <td><button class="btn btn-outline-success" onClick={handleName}><span class="bi bi-plus-lg"></span></button></td>
              </tr>
            )} 
          </tbody>
        </table>
      </div>
    </div>
  );
}

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}


function MyBoard({ users, area, areaDiff }) {
  let data = users.filter(user => user.size !== 0).map(user => ({ value: user.size, label: user.name }));
  if (areaDiff > 0) {
    data.push({ value: areaDiff, label: "Diff" });
  }

  return (
    <>
    {users.length !== 0 && (
      <div class="row">
        <div class="col-12 my-2 mx-2">
          <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
          <PieCenterLabel>{area}m&sup2;</PieCenterLabel>
          </PieChart> 
        </div>
      </div>
    )}
    </>
  );
}

function MyPositions({positions, setPositions}) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePriceChange(event) {
    let value = parseFloat(event.currentTarget.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setPrice(value);
  }

  function handlePositionDelete(event) {
    let key = parseInt(event.currentTarget.getAttribute("data-id", 10));
    var updatedPosition = positions.filter(position => position.key !== key);
    setPositions(updatedPosition);
  }

  function handlePosition(event) {
    let newKey = 1;
    while (positions.find(position => position.key === newKey)) {
      newKey++;
    }
    setPositions([...positions, { key: newKey, name: name, price: price }]);
    setName("");
    setPrice(0);
  }
  

  return (
    <>
    <div class="col-12 mt-2">
      <div class="alert alert-primary text-start" role="alert">
        <h4 class="alert-heading textstart">Positions</h4>
        A houshold holds positions, such as "Electricity" or "Internet", which are shared among the users. Add those positions here.
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {positions.map(position => (   
            <tr>
              <th scope="row">{position.key}</th>
              <td>{position.name}</td>
              <td>{position.price}</td>
              <td> <button class="btn btn-outline-danger" data-id={position.key} onClick={handlePositionDelete}><span class="bi bi-dash-lg"></span></button></td>
            </tr>
          ))
        }
        <tr>
          <th scope="row"></th>
          <td><input type="text" class="form-control" id="name" name="name" value={name} onChange={handleNameChange}/></td>
          <td><input type="number" step="0.01" class="form-control" id="price" name="price" value={price} onChange={handlePriceChange}/></td>
          <td><button class="btn btn-outline-success" onClick={handlePosition}><span class="bi bi-plus-lg"></span></button></td>
        </tr>
      </tbody>
    </table>
    </>
  );
}

function MyCalc({users, area, positions, areaDiff}) {
  const [hot, setHot] = React.useState(0);
  const [cold, setCold] = React.useState(0);
  const [series, setSeries] = React.useState([]);
  const [totals, setTotals] = React.useState({});


  function hotChange(event) {
    let value = parseFloat(event.currentTarget.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setHot(value);
  }

  function coldChange(event) {
    let value = parseFloat(event.currentTarget.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setCold(value);
  }

  const yLabels = users.map(user => user.name);

  function handleInput(event) {
    // also calculate the total
    setTotals({});

    var dict = {};
    users.forEach(user => {
      dict[user.name] = 0;
    });

    setSeries([]);
    var sdata = [];
    
    // in case someone missinterpret the input
    var nebenkosten = (hot > cold) ? hot-cold : hot;

    var coldbar = {};
    var colddata  = [];
    users.forEach(user => {
      colddata.push(user.size * cold / area);
      coldbar.data = colddata;
      coldbar.label = "Cold";
      coldbar.stack = "stack";

      dict[user.name] += user.size * cold / area;
    });
    sdata.push(coldbar);

    if (nebenkosten !== 0 ){
      var hotbar = {};
      var hotdata  = [];
        users.forEach(user => {
        hotdata.push(nebenkosten / users.length);
        hotbar.data = hotdata;
        hotbar.label = "Hot";
        hotbar.stack = "stack";
        dict[user.name] += nebenkosten / users.length;
      });
      sdata.push(hotbar);
    }
    
    if (positions.length > 0) {
      positions.forEach(position => {
        var bar = {};
        var data = [];
        for (let i = 0; i < users.length; i++) {
          data.push(position.price / users.length);
          dict[users[i].name] += position.price / users.length;
        } 
        bar.data = data;
        bar.label = position.name;
        bar.stack = "stack";
        sdata.push(bar);
      });
    }
    
    setTotals(dict);
    setSeries(sdata);
  }

  // function handleCheck(event) {
  //   SetCheck(event.target.checked);
  // }


  return (
    <>
    <div class="col-12 mt-2">
      <div class="alert alert-primary text-start" role="alert">
        <h4 class="alert-heading textstart">Rent Calculation</h4>
          Within this section, you can calculate the rent for each user. The rent is calculated based on the area of the flat, with the cold value (rent without heating) split among the users, while the hot value (heating) is equally distributed. Additionally, your expenses are added to the calculation. If a difference value results from 'Spacing', the user is informed to adjust the area first.</div>
    </div>
      
    <div class="col-12 my-2">
      <div class="input-group">
        <span class="input-group-text bi bi-snow2"></span>
        <input type="number" step="0.01" class="form-control" placeholder="0" value={cold} onChange={coldChange}/>
        <span class="input-group-text bi bi-fire"></span>
        <input type="number" step="0.01" class="form-control" placeholder="0" value={hot} onChange={hotChange}/>
        <button class="btn btn-outline-primary" type="button" onClick={handleInput} disabled={areaDiff !== 0}>Calc</button>
      </div>
    </div>
    {areaDiff > 0  && (
      <div class="col-12 mt-2">
        <div class="alert alert-warning text-start" role="alert">
          Split the area {areaDiff}m&sup2; among the users first.
        </div>
      </div>
    )}
    {areaDiff < 0  && (
      <div class="col-12 mt-2">
        <div class="alert alert-warning text-start" role="alert">
          Your users have too much area. Reduce the area by {Math.abs(areaDiff)}m&sup2; first.
        </div>
      </div>
    )}

    {users.length !== 0 && areaDiff === 0 && cold > 0 && (
      <div class="col-12 my-2" >
        <BarChart
        height={300}
        series={series}
        yAxis={[{ data: yLabels, scaleType: 'band' }]}
        layout="horizontal"
      />
      </div>
    )}

    {Object.keys(totals).length !== 0 && (
      <div class="col-12 my-2">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(totals).map(key => (
              <tr>
                <td>{key}</td>
                <td>{totals[key].toFixed(2)}</td>
              </tr>
            ))}
              <tr>
                <td></td>
                <td>{Object.values(totals).reduce((acc, value) => acc + value, 0).toFixed(2)}</td> 
              </tr>
          </tbody>
        </table>
      </div>
    )}
    </>
  );
}


function MyControlPanel({users, setUsers}) {
  //const [prevsize, setPrevSize] = React.useState(0);
  const [size, setSize] = React.useState(0);
  const [positions, setPositions] = React.useState([]);
  const [areaDiff, setAreaDiff] = React.useState(0);



  function handleInputChange(event) {
    let value = parseFloat(event.currentTarget.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setSize(value); 
    setUsers([]);
    setAreaDiff(0);
  }

  function handleInput(event) {
    setUsers([{key: 0, name: "Random User", size: size}]);
  }
  
  return (
    <>
    <div class="row rounded border border-secondary">
      <div class="col-12 mt-2">
        <div class="alert alert-primary text-start" role="alert">
          <h4 class="alert-heading textstart">Spacing</h4>
          Use this form to define the area of the flat and the users. The area will be divided equally among the users, but is adjustable. If the kummulative area of the users differs from the flat area, the difference will be shown in the "diff" field.
        </div>
      </div>
      <div class="col-5 my-2 mx-2">
        <div class="input-group">
          <span class="input-group-text">m&sup2;</span>
          <input type="number" step="0.01" class="form-control" aria-label="Amount (to the nearest dollar)" id="size" name="size" onChange={handleInputChange} value={size}/> 
          <button class="btn btn-outline-primary" type="button" onClick={handleInput}> Button</button>
        </div>
        <MyUsers users={users} setUsers={setUsers} areaDiff={areaDiff} setAreaDiff={setAreaDiff}/>
      </div>
      <div class="col">
        <MyBoard users={users} setUsers={setUsers} area={size} areaDiff={areaDiff}/>
      </div>
    </div>
    <div class="row rounded border border-secondary  my-2 ">
      <div class="col-12 ">
        <MyPositions positions={positions} setPositions={setPositions}/>
      </div>
    </div>
    <div class="row rounded border border-secondary  my-2 ">
      <div class="col-12 ">
        <MyCalc users={users} setUsers={setUsers} positions={positions} setPositions={setPositions} area={size} areaDiff={areaDiff}/>
      </div>
    </div>
    </>
  );
}

const IndexPage = () => {
  return ( 
    <html>
      <MyHeader />
      <MyBody />
    </html>
  );
}

export default IndexPage

export const Head = () => <title>Home Page</title>
