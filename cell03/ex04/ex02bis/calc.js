$(document).ready(function() {
    $('input[type="submit"]').click(function() {
        const leftVal = $('#left').val().trim();
        const op = $('#operator').val();
        const rightVal = $('#right').val().trim();

        const isPositiveInt = /^[0-9]+$/;
        if (!isPositiveInt.test(leftVal) || !isPositiveInt.test(rightVal)) {
            alert("Error :(");
            return;
        }

        const num1 = parseInt(leftVal, 10);
        const num2 = parseInt(rightVal, 10);

        if ((op === "/" || op === "%") && num2 === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }

        let result = 0;
        switch (op) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            case "%":
                result = num1 % num2;
                break;
        }

        alert(result);
        console.log(result);
    });

    setInterval(function() {
        alert("Please, use me...");
    }, 30000);
});