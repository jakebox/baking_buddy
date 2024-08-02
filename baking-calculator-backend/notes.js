
  User.find()
    .populate({ path: "recipes", select: "recipeName" }) // only populate with recipeName, not whole recipe
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          // fine tuning what we send
          return {
            _id: doc._id,
            username: doc.username,
            recipes: doc.recipes,
            request: {
              type: "GET",
              url: "http://localhost:8000/users/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });