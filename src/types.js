const { request } = require("express");
const { response } = require("express");

/**
 * @typedef {{(req:request,res:response)=>any}} handler
 */

/**
 * @typedef {{(req:request,res:response,next:handler)=>any}} middleware
 */
