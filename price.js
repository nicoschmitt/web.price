var PriceList = {
    ProdE1: { "LevelA": 5.95, "LevelB": 5.76, "LevelC": 5.76, "LevelD": 5.6 },
    ProdE3: { "LevelA": 5.95, "LevelB": 5.76, "LevelC": 5.7, "LevelD": 5.6 },
    ProdE4: { "LevelA": 5.95, "LevelB": 5.76, "LevelC": 5.76, "LevelD": 5.6 },
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

        var product = localStorage.getItem("Product") || "ProdE1";
        var level = localStorage.getItem("Level") || "LevelA";

        $("#" + product).attr("checked", true);
        $("#" + level).attr("checked", true);

        $("#YearMode").prop("checked", localStorage.getItem("YearMode") === "true");

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
   
    localStorage.setItem("Product", $(".product input:checked").val());
    localStorage.setItem("Level", $(".level input:checked").val());
    localStorage.setItem("YearMode", $("#YearMode").prop("checked"));
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
