const retrievePassage = require("../index").retrievePassage;

const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("retrievePassage()", function() {
  it("responds with John 1:5 from the KJV", function() {
    /*
      this retry count & timeout length seems unreasonable,
      however API endpoint @ bibles.org/v2/passages.json 
      tends to be hit or miss
    */
    this.retries(4);
    this.timeout(5000);
    const expected =
      "5: And the light shineth in darkness; and the darkness comprehended it not.";

    const passage = retrievePassage("John 1:5").then(res => {
      return res;
    });

    return expect(passage).to.eventually.equal(expected);
  });
});
