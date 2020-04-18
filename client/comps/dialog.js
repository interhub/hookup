import $ from "JQuery";

export const dialog=(txt,stop=false)=>{
    var box=$("<div id='dialog'></div>");
    $("body").append(box);
    box.text(txt);
    box.animate({
        right:"50px",
    })
    stop?false:setTimeout(()=>{
        box.animate({
            right:"-550px"
        },{
            done:()=>{
                box.remove()
            }
        })
    },2500)
}