import {addRecordForm } from "./exports.js"

$(document).ready(function (){

    let form = addRecordForm
    let dateInput = form.find("#addRecord-dateInput")
    let createBtn= form.find(".btnCreate")
    let errorP =form.find("p#date-error")

    

    function getTodayDate(){

        let now = new Date();
        let dd = String(now.getDate()).padStart(2,"0")
        let mm = String(now.getMonth()+1).padStart(2,"0")
        let year = now.getFullYear()
        return year+"-"+mm+"-"+dd;
    }

    function setErrorMsg(msg=""){
        console.log(msg,"msg")
        console.log(errorP)
        if (msg!=""){
            errorP.html(msg)
            errorP.css({"visibility":"visible"})

        }else{
            errorP.css({"visibility":"hidden"})
        }

    }

    //set value of dateInput to today's date
    dateInput.val(getTodayDate())

    console.log(form)
    form.ajaxForm({
        success:function(resp){
            console.log(resp)
            

            try{
                resp = JSON.parse(resp)
                let error
                ({error} = resp)
                console.log(error)
                setErrorMsg(error);


            }catch {
                setErrorMsg();
                window.location.reload();

            }
        }
    })

})