import express, { Router, Request, Response } from "express";
import { appendFile } from "fs";

const router: Router = express.Router();
// POST /property/search
router.post('/add', async (req: Request, res: Response) => {
    try {
        addProperty(req);
        res.send('Properties stored:  ' + req.app.locals.properties.length)
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/**
 * Adds a property to our in memory list if it is unique.
 * 
 * @param req Payload for the latest request. 
 */
function addProperty(req: any) {
    if (isUniqueProperty(req)) {
        req.app.locals.properties.push(req.body);
    }
}


/**
 * Determines if we've seen this property before.
 * 
 * @param Payload for the latest request.
 */ 
function isUniqueProperty(req: any) {
  let newProperty = req.body;
  let oldProperty = req.app.locals.properties.find(
      (element: any) => element["address"] === newProperty["address"]);

  return oldProperty === undefined;
}


export default router;