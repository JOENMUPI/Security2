function $$(id) { return document.getElementById(id); }
$(function(){
    $("#formuploadajax").on("submit", function(e){
        e.preventDefault();
        var f = $(this);
        var formData = new FormData($$("formuploadajax"));
        formData.append('kuku','jojojo');
        console.log(formData);
        formData.append("dato", "valor");
        $.ajax({
            url: "https://localhost:8443/Asimetrico",
            type: "post",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
	       processData: false
        }).done(function(res){ $("#mensaje").html("Respuesta: " + res); });
    });
});