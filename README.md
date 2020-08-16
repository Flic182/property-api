# Property API Demonstration

## About
This is a simple NodeJS + Express project to demonstrate how to add
property details to an in-memory list and then retrieve those properties,
optionally by suburb.  While stored, the property description is not returned
in a search.  Rather, the property's price is compared to other properties in
the suburb (or all properties if no suburb is chosen), and its market
position is displayed - `pricey` if it is above average, `bargain` if it is
below average, or `average` otherwise.

## Execution
Run the program with `npm start`.  The server runs on http://localhost:3000.
The add endpoint is at `property/add` (requires a `POST`) and the search
endpoint is at `property/search` (requires a `GET`).  Suburb filtering is
optional.  After adding some properties, search with:
http://localhost:3000/property/search?suburb=Melbourne.

## Testing
There are test packets for adding properties in the `__tests__` directory.
These can be copied to Postman for submission or, if you use Visual Studio
Code, install the Rest Client extension and submit them directly from the
IDE.

Unfortunately, automated testing is not yet available.