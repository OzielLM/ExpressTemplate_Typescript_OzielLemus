describe("dummy tests", () => {
    before(() => {
        console.log("before hook ran");
    });

    beforeEach(() => {
        console.log("beforeEach hook ran");
    });

    after(() => {
        console.log("after hook ran");
    });

    afterEach(() => {
        console.log("afterEach hook ran");
    });

    it("should run the first test", () => {
        console.log("test 1");
    });

    it("should run the second test", () => {
        console.log("test 2");
    });
});
