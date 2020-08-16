import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
// GET /property/search
router.get('/search', async (req: Request, res: Response) => {
    try {
        if (req.query.suburb) {
            res.send(summariseResults(filterBySuburb(req)));
        }
        else {
            res.send(summariseResults(req.app.locals.properties));
        }
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/**
 * Examines the passed request's query and returns only those
 * properties in the suburb passed to the endpoint.
 * 
 * @param req Payload of request.
 */
function filterBySuburb(req: any) {
    const regex = new RegExp("^[^,]+,\\s+" + req.query.suburb + "\\s+[0-9+]{4}$")
    return req.app.locals.properties.filter(
        (property: any) => property["address"].search(regex) === 0
    );
}

/**
 * Examines a list of properties and returns their average price.
 * 
 * @param propertyList The properties for which an average is required.
 */
function getAverage(propertyList: any) {
    return propertyList.reduce(
        (acc: number, property: any) => acc + property["price"], 0
    ) / propertyList.length;    
}

/**
 * Compares an average property price to a specific property price, returning
 * "bargain" if the property price is below average, "pricey" if it is above
 * average or "average" if the two values are equal.
 * 
 * @param averagePrice   The average price for comparison.
 * @param propertyPrice  A specific property price.
 */
function getMarketPosition(averagePrice: number, propertyPrice: number) {
    switch (true) {
        case (propertyPrice < averagePrice):
            return "bargain";
        case (propertyPrice > averagePrice):
            return "pricey";
        default:
            return "average";
    }
}

/**
 * Formats the given property list for output.  It drops the
 * property description and adds market position instead.
 * 
 * @param propertyList The properties' details to be returned to the user.
 */
function summariseResults(propertyList: any) {
    const suburbAvg = getAverage(propertyList);

    return propertyList.map(
        (property: any) => {
            const outputProperty: any = {};

            outputProperty["address"] = property["address"];
            outputProperty["price"] = property["price"];
            outputProperty["marketPosition"] = getMarketPosition(suburbAvg, property["price"]);
            return outputProperty;
        }
    );
}

export default router;