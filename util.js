const fun = () => {
    console.log("function is working.");
};

module.exports = fun2 = () => {
    console.log("function2 is working.");    
};

// module.exports = fun;    for single function
module.exports = { fun, fun2 };