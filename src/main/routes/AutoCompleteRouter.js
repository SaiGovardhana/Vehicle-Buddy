const express = require("express");
const { getStatesAutoCompleteEndpoint, getCitiesAutoCompleteEndpoint } = require("../Controllers/AutoCompleteController");

let autoCompleteRouter=express.Router();

autoCompleteRouter.get('/states',getStatesAutoCompleteEndpoint);
autoCompleteRouter.get('/cities/:state?',getCitiesAutoCompleteEndpoint);

module.exports={autoCompleteRouter};
