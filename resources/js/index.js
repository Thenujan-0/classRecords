$(document).ready(function(){
    $(".card").click(function(){
        window.location.href="/class/"+$(this).attr("data-redirect")
    })


    $("#createClassModal #btnCreateClass").click(function(){
        let name_ = $("#createClassModal .input-text").val()
        console.log(name_)
        $.post("/class",{_token:token,name:name_},function(resp){
            console.log("resp",resp)
            window.location.reload()
        })
    })


})