const { Race } = require('./association')

const races = [{ name: "Race 1" }, { name: "Race 2" }, { name: "Race 3" }];

Race.bulkCreate(races)
  .then(() => {
    console.log("Races created successfully");
  })
  .catch((err) => {
    console.error("Error creating races: ", err);
  });
