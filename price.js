var PriceList = {
    ProdE1: { "LevelA": 6.55, "LevelB": 6.34, "LevelC": 6.14, "LevelD": 5.94 },
    ProdE3: { "LevelA": 19.08, "LevelB": 18.49, "LevelC": 17.89, "LevelD": 17.30 },
    ProdE4: { "LevelA": 20.99, "LevelB": 20.33, "LevelC": 19.68, "LevelD": 19.04 },
    ProdE5: { "LevelA": 31.48, "LevelB": 30.50, "LevelC": 29.53, "LevelD": 28.55 },
}

var Price = Price || {};
Price.ListPrice = 1;


$(function () {

    $(".radio input").change(ProductChanged)

    $("#price").on("change", PriceUpdated);
    $("#discount").on("change", DiscountUpdated);
    $("#YearMode").on("change", ProductChanged);

    init();

});

function init() {
    if (typeof (Storage) !== "undefined") {

        var product = localStorage.getItem("Price.Product") || "ProdE1";
        var level = localStorage.getItem("Price.Level") || "LevelA";

        $("#" + product).attr("checked", true);
        $("#" + level).attr("checked", true);

        $("#YearMode").prop("checked", localStorage.getItem("Price.YearMode") === "true");

    } else {

        $("#ProdE1").attr("checked", true);
        $("#LevelA").attr("checked", true);

    }

    $(".level input").checkboxradio("refresh");
    $(".product input").checkboxradio("refresh");
    $("#YearMode").flipswitch("refresh");

    ProductChanged();
}

function SaveState() {
    if (typeof (Storage) == "undefined") return;
   
    localStorage.setItem("Price.Product", $(".product input:checked").val());
    localStorage.setItem("Price.Level", $(".level input:checked").val());
    localStorage.setItem("Price.YearMode", $("#YearMode").prop("checked"));
}

function ProductChanged() {
    var product = $(".product input:checked").val();
    var level = $(".level input:checked").val();

    Price.ListPrice = PriceList[product][level];

    DiscountUpdated();
    SaveState();
}

function PriceUpdated() {
    var price = parseFloat($("#price").val());
    if ($("#YearMode").prop("checked")) {
        price = price / 12;
    }

    var discount = price / Price.ListPrice;
    discount = 100.0 * (1 - discount.toFixed(2));
    discount = discount.toFixed(2);

    price = Price.ListPrice * (1 - discount / 100);
    price = price.toFixed(2);
    if ($("#YearMode").prop("checked")) {
        price = price * 12;
        price = price.toFixed(2);
    }

    $("#price").val(price);

    $("#discount").val(discount);
}

function DiscountUpdated() {
    var discount = parseFloat($("#discount").val());
    var price = Price.ListPrice * (1 - discount / 100);
    price = price.toFixed(2);

    if ($("#YearMode").prop("checked")) {
        price = price * 12;
        price = price.toFixed(2);
    }

    $("#price").val(price);
}
