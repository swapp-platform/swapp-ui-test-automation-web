
export const addCustomMatchers = () => {
    expect.extend({
        myMatcher(actual: unknown, expected: unknown){
            console.log("inside mymatcher");
            return { pass: actual === expected, message: () => 'some message' }
        },
    })
}