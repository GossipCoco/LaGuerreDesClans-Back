const queries = require("../Queries/FictionQueries");

const Fiction = {}

Fiction.countAllMyFictions = (req, res) => {
  queries.countAllMyFictions(req.params.id)
  .then((w) => {
    res.send({ob: w.count, res: true }).status(200);
  })
  .catch((err) => {
    console.log("countAllMyFictions",err);
    res.send(err).status(500);
  });
}
Fiction.countAllFictionsOnBases = (req, res) => {
  queries.countAllFictionsOnBases()
  .then((w) => {
    res.send({ob: w.count, res: true }).status(200);
  })
  .catch((err) => {
    res.send(err).status(500);
  });
}
Fiction.countAllMyFictions = (req, res) => {
  queries.countAllMyFictions(req.params.id)
  .then((w) => {
    res.send({ob: w.count, res: true }).status(200);
  })
  .catch((err) => {
    res.send(err).status(500);
  });
}
Fiction.CountTotalWordBuUser = (req, res) => {
  // console.log(req.params.id)
  queries.CountTotalWordBuUser(req.params.id)
  .then((w) => {
    // console.log(w)
    res.send({ ob: w, res: true, message: "CountTotalWordBuUser" }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(500);
  });
}
Fiction.CountTotalWordBuUserV2 = (req, res) => {
  // console.log(req.params.id)
  queries.CountTotalWordByUserV2(req.params.id)
  .then((w) => {
    // console.log("CountTotalWordByUserV2", w)
    res.send({ ob: w, res: true, message: "CountTotalWordBuUserV2" }).status(200);
  })
  .catch((err) => {
    console.log("CountTotalWordByUserV2", err);
    res.send(err).status(500);
  });
}
Fiction.GetAllFictionsOnBase = (req, res) => {
  console.log("************ GetAllFictionsOnBase *************" + req.body)
  queries.GetAllFictionsOnBase(req.body)
  .then((w) => {
    res.send({ ob: w, res: true }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(500);
  });
  
}
Fiction.GetAllFictionsByName = (req, res) => {
  queries.GetAllFictionsByName(req.params.id, req.body)
  .then((w) => {
    res.send({ ob: w, res: true }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(500);
  });
  
}
Fiction.GetAChapterByName = (req, res) => {
    // console.log(req.params.id)
    queries.GetAChapterByName(req.params.id, req.body)
    .then((w) => {
      res.send({ ob: w, res: true }).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(err).status(500);
    });
}
Fiction.GetLastChapterOfAFiction = (req, res) => {
  console.log("GetLastChapterOfAFiction", req.params.id)
  queries.GetLastChapterOfAFiction(req.params.id)
  .then((w) => {
    res.send({ ob: w, res: true, message: "Chapter created successfully" }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(500);
  });
}
Fiction.GetFiveLastChapByUser = (req, res) => {
  queries.GetFiveLastChapByUser(req.params.id)
  .then((w) => {
    // console.log("CountTotalWordByUserV2", w)
    res.send({ ob: w, res: true, message: "CountTotalWordBuUserV2" }).status(200);
  })
  .catch((err) => {
    console.log("CountTotalWordByUserV2", err);
    res.send(err).status(500);
  });
}
Fiction.CreateANewChapter = (req, res) => {
  console.log(req.file.filename)
  queries.CreateANewChapter(req.params.id, req.body, req.file.filename)
  .then((w) => {
    res.send({ ob: w, res: true, message: "Chapter created successfully" }).status(200);
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(500);
  });
}

Fiction.AddRating = (req, res) => {
  const { Id, FictionId, Rating, UserId,  DateRated} = req.body;

  queries.AddRating(req.params.id, { Id, FictionId, UserId, Rating,  DateRated})
  .then((w) => {
    // console.log("CountTotalWordByUserV2", w)
    res.send({ ob: w, res: true, message: "CountTotalWordAddRatingBuUserV2" }).status(200);
  })
  .catch((err) => {
    console.log("CountTotalWordByUserV2", err);
    res.send(err).status(500);
  });
}
Fiction.CreateCommentForAFiction = (req, res) => {
  const {Id, Content, UserId, FictionId} = req.body
  queries.CreateCommentForAFiction(req.params.id,{Id, Content, UserId, FictionId})
  .then((w) => {
    res.send({ ob: w, res: true, message: "CreateCommentForAFiction" }).status(200);
  })
  .catch((err) => {
    console.log("CreateCommentForAFiction", err);
    res.send(err).status(500);
  });
}
Fiction.GetAllCommentsByFiction = (req, res) => {
  const nav = req.body
  const id = req.params.id
  queries.GetAllCommentsByFiction(id, nav)
  .then((w) => {
    console.log(w)
    res.send({ ob: w, res: true, message: "GetAllCommentsByFiction" }).status(200);
  })
  .catch((err) => {
    console.log("GetAllCommentsByFiction", err);
    res.send(err).status(500);
  });

}
Fiction.GetAllFictionsByUser = (req, res) => {
  console.log("*************** GetAllFictionsByUser ***************", req.params.id, req.body)
  const nav = req.body
  const id = req.params.id
  queries.GetAllFictionsByUser(id, nav)
  .then((w) => {
    res.send({ ob: w, res: true, message: "GetAllFictionsByUser" }).status(200);
  })
  .catch((err) => {
    console.log("GetAllFictionsOnBaseByUser", err);
    res.send(err).status(500);
  });

}
module.exports = Fiction