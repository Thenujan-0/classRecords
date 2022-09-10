import './bootstrap';

window.app = function(){
    console.log("first")
    window.confPopup= {
        elem:$("#confPopup"),
        setText:function(msg){
            confPopup.elem.find("p.dialog-text").html(msg)
        },
        addConfirmCallback:function(callback){
            confPopup.elem.find(".btnConfirm").click(callback)
        },
        addCancelCallback:function(callback){
            confPopup.elem.find(".btnCancel").click(callback)
        },
        show:function(msg,confirmCallback,cancelCallback){
            confPopup.setText(msg)
            confPopup.elem.modal("show")
            confPopup.addConfirmCallback(confirmCallback)
            if(cancelCallback!=undefined){
                confPopup.addCancelCallback(cancelCallback)
            }else{
                confPopup.addCancelCallback(confPopup.hide)
            }

        },
        hide:function(){
            confPopup.elem.modal("hide")
        }
    }
}