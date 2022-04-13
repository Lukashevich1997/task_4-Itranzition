import React, { useEffect, useState } from "react";
import axios from "axios";
import IndexItem from "./Components/MainItem";

const Main = () => {
  const [dataDb, setDataDB] = useState([]);
  const [trueItems, setTrueItems] = useState([]);
  const [isSelectAll, setSelectAll] = useState(false);
  const [arrKeys, setArrKeys] = useState([]);
  useEffect(() => {
    axios      
      //.get("https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users.json")      
      .get("https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name.json")      
      .then((data) => {
        setDataDB(Object.values(data.data));
        setArrKeys(Object.keys(data.data));
      });
  }, []);

  for (let value in dataDb) {
    dataDb[value]["key"] = arrKeys[value];
  }

  const BoxHundler = () => {
    setSelectAll(!isSelectAll);
    setTrueItems([]);
  };

  console.log(trueItems);

  const DeleteHundler = () => {
    for (let key in trueItems) {
      console.log(trueItems[key].data["key"]);
      axios
        .delete(
          `https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name/${trueItems[key].data["key"]}.json`
        )
        .then((response) => {
          console.log(response);
          document.location.href = "http://localhost:3000/main";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const BlockHundler = () => {
    for (let str in trueItems) {
      if (trueItems[str]["data"]["isLogin"] === true) {
        // console.log(trueItems[str]["data"]["status"]);
        trueItems[str]["data"]["status"] = "block";
        trueItems[str]["data"]["isLogin"] = false
        axios
          .put(
            `https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name/${trueItems[str]["data"]["key"]}.json`,
            trueItems[str]["data"]
          )
          .then((response) => {
            console.log(response);
            document.location.href = "http://localhost:3000/";
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        trueItems[str]["data"]["status"] = "block";

        axios
          .put(
            `https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name/${trueItems[str]["data"]["key"]}.json`,
            trueItems[str]["data"]
          )
          .then((response) => {
            console.log(response);
            document.location.href = "http://localhost:3000/main";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const UnBlockHundler = () => {
    for (let str in trueItems) {
      trueItems[str]["data"]["status"] = "unblock";

      axios
        .put(
          `https://my-web-app-d0375-default-rtdb.europe-west1.firebasedatabase.app/users/jack/name/${trueItems[str]["data"]["key"]}.json`,
          trueItems[str]["data"]
        )
        .then((response) => {
          console.log(response);
          document.location.href = "http://localhost:3000/main";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 className="text-center">Users</h1>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">
              <input type="button" onClick={BlockHundler} value="Block" />
            </th>
            <th scope="col">
              <input type="button" onClick={UnBlockHundler} value="Unblock" />
            </th>
            <th scope="col">
              <input type="button" onClick={DeleteHundler} value="Delete" />
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <thead className="table-light">
          <tr>
            <th scope="col">
              <input type="checkbox" onClick={BoxHundler} name="" id="" />{" "}
              Выделить/снять все
            </th>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Mail</th>
            <th scope="col">DateOfSign</th>
            <th scope="col">DateOFLastLogin</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataDb.map((data, index) => {
            return (
              <IndexItem
                data={data}
                index={index}
                isSelectAll={isSelectAll}
                onClick={(isChecked, indexUnsetItem) => {
                  if (isChecked) {
                    setTrueItems((prevState) => [
                      ...prevState,
                      { index, data },
                    ]);
                  } else {
                    const index = trueItems.findIndex(
                      (n) => n.index === indexUnsetItem
                    );
                    if (index !== -1) {
                      trueItems.splice(index, 1);
                      setTrueItems(trueItems);
                    }
                  }
                }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Main;