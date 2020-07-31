    let delay = function(f, ms) {
        return function () {
            var savedThis = this;
            var savedArgs = arguments;

            setTimeout(function () {
                f.apply(savedThis, savedArgs);
            }, ms);
        };
    };

    export default delay;