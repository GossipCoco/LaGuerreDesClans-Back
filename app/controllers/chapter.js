const query = require('../Queries/ChapterQueries')

const { handleResponse } = require("./function");  // Importer la fonction
const Chapter = {}

Chapter.GetAChapterByName = async (req, res) => {
    handleResponse(res, query.GetAChapterByName(req.params.id, req.body));
  };
  Chapter.GetLastChapterOfAFiction = async (req, res) => {
    handleResponse(res, query.GetLastChapterOfAFiction(req.params.id));
  };
  
  Chapter.GetFiveLastChapByUser = async (req, res) => {
    handleResponse(res, query.GetFiveLastChapByUser(req.params.id));
  };
  
  Chapter.CreateANewChapter = async (req, res) => {
    handleResponse(res, queries.CreateANewChapter(req.params.id, req.body, req.file.filename));
  };
  Chapter.EditChapter = async (req, res) => {
    handleResponse(res, query.EditChapter(req.params.id, req.body))
  }

  module.exports = Chapter