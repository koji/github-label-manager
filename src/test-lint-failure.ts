// This file intentionally contains linting errors to test CI failure scenarios

export const testFunction = () => {
    // Intentional linting errors:
    var unusedVariable = "this should cause an error";  // var instead of const/let
    console.log("test")  // missing semicolon

    // Unused variable
    const anotherUnused = 123;

    return "test"
}

// Missing export
function unexportedFunction() {
    return true
}