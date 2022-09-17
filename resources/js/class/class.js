import {addRecordForm } from "./exports.js"


$(document).ready(function(){

    //Call the funtion in app.js
    app()

    let main = $("main")
    let btnAdd = main.find(".btnAdd")
    let trashBtn = main.find(".trashBtn")
    let calendar = main.find(".calendar-body")
    //Add callback to add btn
    btnAdd.click(function(){
        // addRecordForm.css("display","block")
    })

    //Add trash btn callback
    trashBtn.click(function(){
        let id = $(this).attr("data-id")
        $.post("/deleteRecord")
        //TODO
    })

    function getDaysInMonth(year, month) {
        /* Month is the actual month not index */
        return new Date(year, month, 0).getDate();
    }

    function getLastDate(){
        return main.find("p.lastDate").html()
    }

    function dateFromStr(input){
        let arr =input.split("-")
        arr.unshift()
        let [year , month,date] = arr
        return new Date(year,month-1,date)
    }


    function getLastYearMonth(){
        let arr =getLastDate().split("-")
        arr.unshift()
        return arr
    }
    // console.log(window.confPopup)

    // confPopup.show("Are you sure you're over 18 years?",function(){
    //     confPopup.hide()
    // })


    let cal = {
        calMonth : main.find(".calendar-month"),
        calYear:main.find("p.calendar-year"),
        btnRight:main.find(".btnRight"),
        btnLeft: main.find(".btnLeft"),
        months:["January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December"],
        set : function (year,month){
            if ([year,month].includes(undefined)){
                throw Error("Not enough values were passed to calendar set");
            }
            /* Month is the actual month not index */
    
            cal.calMonth.html(cal.months[month-1])
            cal.calYear.html(year)
    
            //Clear the existing calendar
            calendar.empty()
    
            let daysInMonth = getDaysInMonth(year,month)
    
            //find the day of first date
            let day = (new Date(year,month-1,1)).getDay()
    
            let dates = []
    
            //Add the last month dates first
            for( let i =0  ; i<day;i++){
                
                //get days in the last month
                let daysInLastMon=getDaysInMonth(year,month-1)
                console.log(daysInLastMon,"days in lastMonth",month)
                console.log(day,"day")
                let date =  daysInLastMon -(day -i -1)
                console.log(date,"date")
                let targetDateObj= new Date(year,month-2,date)
    
    
                let targetDate = targetDateObj.getDate()
                
                dates.push(targetDate)
                console.log(targetDate)
            }
            
    
            for( let i = 1 ;  i<=daysInMonth; i++){
                dates.push(i)
            }
    
            let toAppend = ''
            let reachedFirst = false;
            dates.forEach(function(value,ind){
                if (!reachedFirst && value==1){
                    reachedFirst = true;
                }

                let divClass = "col-sm p-2 btn text-dark dateItem"
                if(!reachedFirst){
                    divClass = "col-sm p-2 btn text-muted dateItem"

                }
                let divClassEmpty = "col-sm p-2"
                if (ind==0){
                    toAppend+= "<div class='row'>"
                }
    
                toAppend+= `<div class="${divClass} date-${value}"><p class="dateText">${value}</p></div>`
    
    
                if((ind+1) %7 ==0){
                    
                    toAppend+= "</div><div class='row'>"
                }
    
                if( ind==dates.length -1){
                    while((ind+1)%7!=0){
                        ind+=1;
                    toAppend+= `<div class="${divClassEmpty}"></div>`
    
                    }
                    toAppend+= "</div>"
                }
    
            })
    
            calendar.append(toAppend)

            cal.setClass()
            cal.setFinalRecord()


            //Add datePopupCallback
            $(".btn.dateItem").click(function(e){
                let class_ = $(this).hasClass("class")
                let [year,month ] = cal.get()
                let date = year+" "+cal.months[month-1]+" "+$(this).find("p.dateText").text()
                // $(".datePopup").css({"top":e.pageY,"left":e.pageX})
                datePopup.show(date,e.pageX,e.pageY,class_)
            })

        },
        get:function(){
            let arr = []
            arr.push(parseInt(cal.calYear.html()))
            arr.push(cal.months.indexOf(cal.calMonth.html())+1)
            return arr
        },
        nextMonth:function (){

            let [year,month] = cal.get()
            if (month===12){
                cal.set(year+1,1)
                return
            }
            cal.set(year,month+1)         

        },
        beforeMonth : function(){
            let [year,month] = cal.get()
            if (month===1){
                cal.set(year-1,12)
                return
            }
            cal.set(year,month-1)   
        },
        setFinalRecord:function(){
            let [year , month]  = cal.get()
            month = parseInt(month)
            year = parseInt(year)

            let classId = get_classId()
            $.ajax({url:`/class/${classId}/getFinalRecord`,
                dataType:"json",
                type:"get",
                async:true,
                
                success:function (date){
                    console.log("yes")
                    if (date == null){
                        return
                    }
                    let date_ = date.split("-")
                    let month_ = date_[1]
                    if (month_!=month){
                        return
                    }
                    let dateDay = parseInt(date_[date_.length-1])
                    let finalRecordStyle = "bg-dark"
                    console.log($(".btn.dateTime.finalRecord"))
                    $(".btn.dateItem.finalRecord").removeClass(finalRecordStyle)
                    let realFinRecord=$(".btn.dateItem.date-"+dateDay)
                    realFinRecord
                                .addClass(finalRecordStyle)
                                .addClass("finalRecord")

                    realFinRecord.append($("<div/>"))

                    // $(".btn.dateItem.date-"+dateDay).removeClass("btn-primary")

                },
                error:function(req,status,error){
                    console.log("Error in getFinalRecord", req.responseText)
                }
            })
        },
        setClass : function (){
            /* adds .class to all the dates where the class was held */
            let [year , month]  = cal.get()
            month = parseInt(month)
            year = parseInt(year)

            $.ajax({url:window.location.href+"/getDates",
                dataType:"json",
                type:"get",
                async:true,

                success:function(dates){
                    let classStyle = "text-white bg-primary opacity-50"
                    let nonClassStyle="text-dark"
                    calendar.find(".dateItem.btn").each(function(_,value){
                        let  [ year,month] = cal.get()
                        month =String(month).padStart(2,"0")
                        let day = String ($(value).find("p.dateText").text()).padStart(2,"0")
                        let dateStr =year+"-"+month+"-"+day
                            
                            let dateObj = dateFromStr(dateStr)
                            let dateMonth = dateObj.getMonth() +1
                            let dateYear = dateObj.getFullYear()
                            let date = dateObj.getDate()
                
                
                            if (dateMonth !== parseInt(month) || year!== dateYear){
                                return
                            }
                        //if it just an empty div to cover up empty space in the end

                        if (dates.includes(dateStr)){
                            calendar.find(`.dateItem.date-${date}`).addClass(`${classStyle} class`)
                            calendar.find(`.dateItem.date-${date}`).removeClass(`${nonClassStyle}`)
                        }else{

                            calendar.find(`.dateItem.date-${date}`).removeClass(`${classStyle} class`)
                            calendar.find(`.dateItem.date-${date}`).addClass(`${nonClassStyle}`)
                        }


                    })
                },
                error:function(req,status,error){
                    console.log("Error in /getDates", req.responseText)
                }
            })
    
            
        },
        // update:function(){
        //     let [ year, month] = cal.get()
        //     cal.set(year,month)
        // }
    }

    let [year , month] = getLastYearMonth()
    if ([month,year].includes(undefined)){
        console.log("NO records exist already so setting calendar to current date")
        let date = new Date()
        year = date.getFullYear()
        month = date.getMonth()+1
        console.log(year,month)
        
        cal.set(year,month)
    }else{
        cal.set(year,month)

    }
    cal.btnRight.click(cal.nextMonth)
    cal.btnLeft.click(cal.beforeMonth)

    let datePopup = {
        elem : $(".datePopup"),
        btnDel :$(".datePopup").find(".btn-danger"),
        btnAdd:$(".datePopup").find(".btn-primary"),
        btnFin:$(".datePopup").find(".btnFinalDate"),
        show: function(date,x,y,class_){
            datePopup.elem.css("display","block")
            datePopup.elem.find(".classDate").text(date)
            $(".datePopup").css({"top":y+10,"left":x+10})
            if(class_){
                datePopup.btnAdd.css("display","none")
                datePopup.btnDel.css("display","block")
                datePopup.btnFin.css("display","block")

            }else{
                datePopup.btnDel.css("display","none")
                datePopup.btnAdd.css("display","block")
                datePopup.btnFin.css("display","none")
            }

        },
        hide:function(){
            datePopup.elem.css("display","none")
        },
        currDate:function(){
            /* Returns date in yyyy mm dd */
            if(datePopup.elem.css("display")=="block"){
                let fullDate = datePopup.elem.find(".classDate").text()
                let [ year , monthS , date] = fullDate.split(" ")
                let month = String(cal.months.indexOf(monthS)+1)
                return year+" "+month.padStart(2,"0")+" "+date.padStart(2,"0")
            }
        }
    }

    function get_classId(){
        let link = window.location.href
        let lastSlash =link.lastIndexOf("/")
        let classId = link.substring(lastSlash+1)
        return classId
    }

    function datePopupCallbackCreator(url){
        function callback(){
            let classId= get_classId()
            let date_ = datePopup.currDate().replaceAll(" ","-")
            return $.post(url,{_token:token,date:date_,class_id:classId},function(resp){
                cal.setClass()
                datePopup.hide()
                console.log(resp,"response of datePopupCallback")
            }).done(function (){console.log("Yeah bro");setCurrClassCount();setLastFinalClass()})
        }
        return callback
    }

    // //Datepopup btnAdd Callback
    // function datePopupAdd(){
        
    //     let classId= get_classId()
    //     let date_ = datePopup.currDate().replaceAll(" ","-")
    //     $.post("/addRecord",{_token:token,date:date_,class_id:classId},function(resp){
    //         cal.setClass()
    //         datePopup.hide()
    //     })

    // }

    // //Datepopup btnDel callback
    // function datePopupDel(){
    //     let classId = get_classId()
    //     let date_ = datePopup.currDate().replaceAll(" ","-")
    //     $.post("/deleteRecord",{_token:token,date:date_,class_id:classId},function(resp){
    //         cal.setClass()
    //         datePopup.hide()
    //     })

    // }

    function datePopupFin(){
        let classId = get_classId()
        let date_ = datePopup.currDate().replaceAll(" ","-")
        $.post(`/class/${classId}/setFinalRecord`,{_token:token,date:date_},function(resp){
            cal.setClass()
            cal.setFinalRecord()
            datePopup.hide()
            console.log(resp)
            
        }).done(function(){
            setCurrClassCount()
            setLastFinalClass()
        })

    }
    datePopup.btnAdd.click(datePopupCallbackCreator("/addRecord"))
    datePopup.btnDel.click(datePopupCallbackCreator("/deleteRecord"))
    datePopup.btnFin.click(datePopupFin)


    function clickedOnDate(event){
        return $(".btn.dateItem").toArray().some(function(elem){return elem.contains(event.target)})
    }
    
    $(document).click(function(e){

        //If clicked outside calendar date hide the popup
        if ( !clickedOnDate(e) && !datePopup.elem[0].contains(e.target) ){
            datePopup.hide()
        }
        if( ! menuPopup.trigger[0].contains(e.target) && !menuPopup.elem[0].contains(e.target)){
            menuPopup.hide()
        }

        console.log(menuPopup.elem[0].contains(e.target))
        console.log(menuPopup.trigger[0].contains(e.target))
    })

    let menuPopup = {
        trigger:$("#btnClassMenu"),
        elem :$(".menuPopup"),
        btnDel:$(".menuPopup .btnDel"),
        btnEdit:$(".menuPopup .btnEdit"),
        hide:function(){
            menuPopup.elem.css("display","none")
            console.log("hiding elem",menuPopup.elem)
        },
        show(x,y){
            menuPopup.elem.css({"display":"block","left":x+10,"top":y+10})
        }
    }
    menuPopup.btnDel.click(function(){
        confPopup.show("Are you sure want to delete the class named \""+$("h3.className").text()+"\"?",
        function(){
            $.ajax({url:"/class/"+get_classId(),
                dataType:"json",
                type:"delete",
                data:{_token:token},
                async:true,
                success:function(){window.location.href="/"},
                error:function(resp){
                    console.log("error occured on delete class",resp.responseText)
                }
            })
        })
    })

    menuPopup.btnEdit.click(function(){
        let modal = $("#editClassModal")
        modal.modal("show")
        console.log(modal.find("p.header-text"),"elem")
        modal.find("p.header-text").html("Enter new name for the class")
        let btn =modal.find(".btn.btn-primary")
                        .html("Save")
                        .addClass("btn-warning")
                        .removeClass("btn-primary")

        btn.click(function(){
            console.log(modal.find(".input-text"))
            console.log(modal.find(".input-text").val())
            $.ajax({url:"/class/"+get_classId(),
                dataType:"json",
                type:"PATCH",
                data:{"name":modal.find(".input-text").val(),_token:token},
                async:true,

                success:function(resp){
                    console.log("success",resp)
                    modal.modal("hide")
                    if (resp.responseText=="null"){
                        console.log("Error occured please enter valid name")
                        return
                    }
                    window.location.reload()


                },
                error:function(resp){
                    console.log("error",resp.responseText,resp)
                }
            })
        })

    })
    menuPopup.trigger.click(function(e){
        let x = e.pageX
        let y = e.pageY
        menuPopup.show(x,y)
    })

    function currClassCount(callback){
        $.ajax({url:"/class/"+get_classId()+"/getDates",
        dataType:"json",
        type:"get",
        async:true,

        success:function(dates){
            $.ajax({url:"/class/"+get_classId()+"/getFinalRecord",
                dataType:"json",
                type:"get",
                async:true,
                success:function(lastReset){
                    let [ year , month , day] = lastReset.split("-")
                    let lastResetDate = new Date(year,month-1,day)

                    let count = 0
                    dates.forEach(function(date){
                        let [ year, month ,day] = date.split("-")
                        let targetDate = new Date(year,month-1,day)
                        if (targetDate >lastResetDate){
                            count++
                        }
                    })
                    
                    callback(count)
                }
            })

        },
        error:function(resp){
            console.log("error getdates",resp.responseText)
        }

        
        })

    }
    function setCurrClassCount(){
        // currClassCount(function(count){$("span#currClassCount").html(count)})
        $.ajax({url:"/class/"+get_classId()+"/getClassCount",
            dataType:"json",
            type:"get",
            async:true,

            success:function(resp){
                let elem =$("span#currClassCount")
                if (resp!=null){
                    elem.text(resp)
                }else{
                    elem.text("null")
                }
            },
            error:function(resp){
                console.log("Error in setCurrClassCount")
            }
    
        })
        
    }

    function setLastFinalClass(){
        // currClassCount(function(count){$("span#currClassCount").html(count)})
        $.ajax({url:"/class/"+get_classId()+"/getFinalRecord",
            dataType:"json",
            type:"get",
            async:true,

            success:function(resp){
                let elem =$("span#finClassCount")
                if (resp!=null){
                    let text= ""
                    let [year,month,day]=resp.split("-")
                    let currYear = new Date().getFullYear()
                    if (currYear == year){
                        text = cal.months[month-1]+" "+day
                    }else{
                        text = year+ " " +cal.months[month-1]+" "+day
                    }
                    elem.text(text)
                }else{
                    elem.text("null")
                }
            },
            error:function(resp){
                console.log("Error in setCurrClassCount")
            }
    
        })
        
    }

    setCurrClassCount()
    setLastFinalClass()

    

    
})