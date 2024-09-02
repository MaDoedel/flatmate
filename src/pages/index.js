import * as React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


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
  return (
    <body>
      <div class="container text-center pt-4">
        <div class="row mx-2 my-2">
          <div class="col">
            Column
          </div>
          <div class="col-8">
            <MyControlPanel />
          </div>
          <div class="col">
            Column
          </div>
        </div>
      </div>
    </body>
  );
}


function MyUsers({ users, setUsers }) {
  const [name, setName] = React.useState("");

  function handleNameChange(event) {
    setName(event.target.value); 
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


  return (
    <div class="row my-2  rounded border border-secondary">
      <div class="col-12 ">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                
                <tr>
                  <th scope="row">{user.key}</th>
                  <td>{user.name}</td>
                  <td>
                  {user.key !== 0 && (
                    <button class="btn btn-outline-danger" data-id={user.key} onClick={handleUserDelete}><span class="bi bi-dash-lg"></span></button>
                  )}</td>
                </tr>
              ))
            }
            {users.length !== 0 && 
              <tr>
                <th scope="row"></th>
                <td>
                  <input type="text" class="form-control" id="name" name="name" value={name} onChange={handleNameChange}/>
                </td>
                <td><button class="btn btn-outline-success" onClick={handleName}><span class="bi bi-plus-lg"></span></button></td>
              </tr>
            } 
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


function MyBoard({ users, setUsers, area}) {
  const [hot, setHot] = React.useState(0);
  const [cold, setCold] = React.useState(0);

  function handleInput(event) {
    console.log("handleInput");
  }

  const data = users.filter(user => user.size !== 0).map(user => ({ value: user.size, label: user.name }));

  return (
    <>
    {users.length !== 0 && (
      <div class="row">
        <div class="col-12 my-2 mx-2">
          <div class="input-group">
            <span class="input-group-text bi bi-fire"></span>
            <input type="decimal" class="form-control" placeholder="0" value={hot} onChange={(e) => setHot(e.target.value)}/>
            <span class="input-group-text bi bi-snow2"></span>
            <input type="decimal" class="form-control" placeholder="0" value={cold} onChange={(e) => setCold(e.target.value)}/>
            <button class="btn btn-outline-primary" type="button" onClick={handleInput}>Calc</button>
          </div>
        </div>
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

function MyPositions() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [positions, setPositions] = React.useState([]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
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
              <td>
                <input type="text" class="form-control" id="name" name="name" value={name} onChange={handleNameChange}/>
              </td>
              <td>
                <input type="decimal" class="form-control" id="price" name="price" value={price} onChange={handlePriceChange}/>
              </td>
              <td><button class="btn btn-outline-success" onClick={handlePosition}><span class="bi bi-plus-lg"></span></button></td>
            </tr>
          </tbody>
        </table>
  );
}


function MyControlPanel(v) {
  //const [prevsize, setPrevSize] = React.useState(0);

  const [size, setSize] = React.useState(0);
  const [users, setUsers] = React.useState([]);

  function handleInputChange(event) {
    //setPrevSize(size);
    setSize(event.target.value); 
  }

  function handleInput(event) {
    if (users.length === 0) {
      setUsers([{key: 0, name: "Random User", size: size}]);
    } 
    // else {
    //   if (prevsize > size) {
    //     var diff = (prevsize - size) / users.length;
    //     var updatedUsers = users.map(user => {
    //       user.size -= diff;
    //       return user;
    //     });
    //     setUsers(updatedUsers);
    //   } else if (prevsize < size) {
    //     var diff = (size - prevsize) / users.length;
    //     var updatedUsers = users.map(user => {
    //       user.size += diff;
    //       return user;
    //     });
    //     setUsers(updatedUsers);
    //   }
    // }
  }
  
  return (
    <>
    <div class="row rounded border border-secondary">
      <div class="col-5 my-2 mx-2">
        <div class="input-group">
          <span class="input-group-text">m&sup2;</span>
          <input type="decimal" class="form-control" aria-label="Amount (to the nearest dollar)" id="size" name="size" onChange={handleInputChange} value={size}/> 
          <button class="btn btn-outline-primary" type="button" onClick={handleInput}> Button</button>
        </div>
        <MyUsers users={users} setUsers={setUsers}/>
      </div>
      <div class="col">
        <MyBoard users={users} setUsers={setUsers} area={size}/>
      </div>
    </div>
    <div class="row rounded border border-secondary  my-2 ">
      <div class="col-12 ">
        <MyPositions/>
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
