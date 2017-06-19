# Redux Example

Install deps
`npm i`

Run demo
`npm run start`

# Action payload contracts
This project demonstrates the payload contract pattern, which is an
extension of the FSA specification adding the constraints where action
payloads must conform to contracts :
```javascript
{
    type: mandatory action type (see FSA),
    error: optional Error() object in the event of an error (see FSA),
    payload: {
        contract1: contract1 as specifed in /contracts/contract1.js,
        contract2: contract2 as specifed in /contracts/contract2.js,
    },
    meta: {
        see FSA
    }
}
```
