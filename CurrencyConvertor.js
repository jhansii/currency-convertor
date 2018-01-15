function convertor(i) {
    var xhttp = new XMLHttpRequest();
    var baseCurrency = document.getElementsByName("base_currency")[i];
    var baseCurrencyText = baseCurrency.options[baseCurrency.selectedIndex].text;
    var targetCurrency = document.getElementsByName("target_currency")[i];
    var targetCurrencyText = targetCurrency.options[targetCurrency.selectedIndex].text;
    //Constructed API call in such a way that, When we send a value with the base currency we get the converted value in the target currency 
    var params = "base=" + baseCurrencyText + "&symbols=" + targetCurrencyText;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (baseCurrencyText != targetCurrencyText) {
                //Parsing response JSON
                var obj = JSON.parse(this.responseText);
                document.getElementsByName('convertor')[i].value = obj.rates[targetCurrencyText] * document.getElementsByName('convert')[i].value;
            } else {
                document.getElementsByName('convertor')[i].value = document.getElementsByName('convert')[i].value;
            }
            //Handling Negative Values Input
            if (Math.sign(document.getElementsByName('convert')[i].value) == -1) {
                document.getElementsByName('convertor')[i].value = "";
            }
        }
        //API Outage
        else if (this.readyState == 4 && this.status != 200) {
            alert("OOPS! Something Went Wrong");
        }
    }
    xhttp.open("GET", API_URL + "?" + params, true);
    xhttp.send();
}