import * as SQLite from "expo-sqlite";
export const update = (sql, id) => {
  const db = SQLite.openDatabase("myDatabaseName.db");
  db.transaction(async function (txn) {
    // Drop the table if it exists
    txn.executeSql(sql, []);
    const response = await new Promise((resolve, reject) =>
      txn.executeSql(
        "SELECT * FROM `SHOPPING_LIST` WHERE id='" + id + "'",
        [],
        function (tx, res) {
          let array = [];
          for (let i = 0; i < res.rows.length; i++) {
            array.push(res.rows.item(i));
          }
          resolve(array);
        }
      )
    );
    console.log(response);
    // Create the table and define the properties of the columns

    // const response = await new Promise((resolve, reject) =>
    //   txn.executeSql("SELECT * FROM `SHOPPING_LIST`", [], function (tx, res) {
    //     let array = [];
    //     for (let i = 0; i < res.rows.length; i++) {
    //       array.push(res.rows.item(i));
    //     }
    //     resolve(array);
    //   })
    // );
  });
};
